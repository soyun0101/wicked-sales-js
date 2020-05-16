
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
      <div>
        <div className="container">
          <div className="row">
            <ProductListItem products={this.state.products}/>
          </div>
        </div>
      </div>
    );

  }
}
