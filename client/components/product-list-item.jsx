import React from 'react';
import numeral from 'numeral';

export default class ProductListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = null;
  }

  render() {

    return this.props.products.map(eachProduct => {

      const dividedPrice = eachProduct.price / 100;

      return (
        <div key={eachProduct.productId}>
          <div className="card ml-4 mt-3" style={ { width: '18rem' } }>
            <img src={eachProduct.image} className="card-img-top" alt="image of each product"/>
            <div className="card-body">
              <h6 className="card-title">{eachProduct.name}</h6>
              <p>{numeral(dividedPrice).format('$0.00')}</p>
              <p className="card-text">{eachProduct.shortDescription}</p>
            </div>
          </div>
        </div>
      );

    });
  }
}
