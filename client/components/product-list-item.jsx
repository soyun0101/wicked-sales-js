import React from 'react';
import numeral from 'numeral';

export default class ProductListItem extends React.Component {

  render() {

    const handleCatalogClick = () => this.props.setView('details', this.props.productId);

    return (
      <div onClick={handleCatalogClick} className="card ml-4 mt-3 product-item" style={ { width: '18rem' } }>
        <img src={this.props.image} className="card-img-top product-item" alt="image of each product"/>
        <div className="card-body">
          <h6 className="card-title">{this.props.name}</h6>
          <p>{numeral(this.props.price).format('$0.00')}</p>
          <p className="card-text product-item">{this.props.shortDescription}</p>
        </div>
      </div>
    );

  }
}
