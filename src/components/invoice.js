import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <h3>Invoice</h3>
      </>
    );
  }
}

export default withRouter(Invoice);
