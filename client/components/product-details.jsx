import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      message: null
    };

  }

  componentDidMount() {

    const productId = this.props.params;

    fetch(`/api/products/${productId}`)
      .then(result => result.json())
      .then(data => this.setState({ product: data }))
      .catch(err => this.setState({ message: err.message }));
  }

  render() {

    const dividedPrice = this.state.product.price / 100;

    const { image, name, shortDescription, longDescription } = this.state.product;

    return (
      <div className="card mb-3 card-size">
        <p onClick={this.props.handleClick} className="text-muted mt-4 mb-5 pl-5" style={{ cursor: 'pointer' }}>{'< Back to catalog'}</p>
        <div className="row no-gutters">
          <div className="col-md-4 pl-5">
            <img src={image} alt="" width="70%" height="90%" object-fit="scale-down"/>

          </div>
          <div className="col-md-8">
            <div className="card-body pl-5">
              <h4 className="card-title">{name}</h4>
              <p className="card-text">{`$${dividedPrice.toFixed(2)}`}</p>
              <p className="card-text">{shortDescription}</p>
            </div>

          </div>
          <div className="card-body pl-5">
            <p className="card-text">{longDescription}</p>

          </div>
        </div>
      </div>
    );

  }

}
