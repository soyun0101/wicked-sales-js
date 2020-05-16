import React from 'react';
// import logo from '../../server/public/images/favicon.png';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = null;
  }

  render() {
    return (
      <div className="header">
        <h1>$ Wicked Sales</h1>
      </div>
    );
  }
}
