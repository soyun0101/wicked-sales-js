
import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      message: null
    };

    this.getProducts = this.getProducts.bind(this);

  }

  getProducts() {

    fetch('/api/products')
      .then(res => res.json())
      .then(data => this.setState({ products: data }))
      .catch(err => this.setState({ message: err.message }));
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {

    return (

      <div className="container">
        <div className="row">
          {
            this.state.products.map(eachProduct => {
              const { productId, image, name, shortDescription } = eachProduct;

              const dividedPrice = eachProduct.price / 100;

              return <div key={productId} className="col-lg-3 ml-4" >
                <ProductListItem setView={this.props.setView} productId={productId} image={image} name={name} price={dividedPrice} shortDescription={shortDescription}/>
              </div>;

            })
          }
        </div>
      </div>

    );

  }
}
