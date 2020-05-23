require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {

  const sqlGetProducts = `
      SELECT "productId",
              "name",
              "price",
              "image",
              "shortDescription"
        FROM "products";
  `;

  db.query(sqlGetProducts)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {

  const { productId } = req.params;

  const sqlGetEachProduct = `
      SELECT *
        FROM "products"
      WHERE "products"."productId" = ${productId};
  `;

  db.query(sqlGetEachProduct)
    .then(result => {
      res.status(200).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {

  const sqlCart = `
  `;

  db.query(sqlCart)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));

});

app.post('/api/cart/:productId', (req, res, next) => {

  const { productId } = req.params;

  if (productId > 0) {
    const sqlCart = `
      SELECT "price"
        FROM "products"
      WHERE "products"."productId" = ${productId};
      `;

    db.query(sqlCart)
      .then(result => {
        if (!result.rows[0]) {
          res.status(400).json(new ClientError('no results listed for the id provided'));
        } else {
          const sqlInsertId = `
            insert into "carts" ("cartId", "createdAt")
            values (default, default)
            returning "cartId"
           `;

          db.query(sqlInsertId)
            .then(cartIdResult => {
              res.status(200).json({
                cartId: cartIdResult.rows[0].cartId,
                price: result.rows[0].price
              });
            });
        }
      })
      .then()
      .then()
      .catch(err => next(err));

  }
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
