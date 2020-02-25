import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="invoice">
        <h1 className="logo">RYAZ</h1>
        <div className="sub-header">RYAZIO TECHNOLOGIES LLP</div>
        <div className="hr" />
        <div className="row flex">
          <div className="title">Invoice : B1</div>
          <div className="content">Skillshape</div>
        </div>
        <div className="row flex">
          <div className="title">Invoice : B1</div>
          <div className="content">Skillshape</div>
        </div>
        <div className="row flex">
          <div className="title">Invoice : B1</div>
          <div className="content">Skillshape</div>
        </div>
        <table className="employee-data">
          <thead>
            <tr>
              <td>Item</td>
              <td>Total Hours</td>
              <td>Unit Price</td>
              <td>Cost</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name</td>
              <td>69 hours</td>
              <td>6000000000000$</td>
              <td>Infinity da symbol ni hga</td>
            </tr>

          </tbody>
        </table>
        <div className="total">Total: $123</div>
      </div>
    );
  }
}

export default withRouter(Invoice);
