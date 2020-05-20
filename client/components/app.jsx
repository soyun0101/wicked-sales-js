import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      }
    };

    this.setView = this.setView.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  setView(name, params) {

    this.setState({
      view: {
        name,
        params
      }
    });
  }

  handleClick() {

    this.setView('catalog', {});
  }

  render() {

    return this.state.isLoading
      ? <h1>Testing connections...</h1>
      : <div>
        <Header/>
        {(() => {
          switch (this.state.view.name) {
            case 'catalog': return <ProductList setView={this.setView} />;
            case 'details': return <ProductDetails params={this.state.view.params} setView={this.setView} handleClick={this.handleClick}/>;
          }
        })()}
      </div>;

  }
}
