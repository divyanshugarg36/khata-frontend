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
        </div>
        <div className="row flex">
          <div className="title">Attention : </div>
          <div className="content">
            Sam Schikowitz
            <br />
            Skillshape
          </div>
        </div>
        <div className="row flex">
          <div className="title">Date : </div>
          <div className="content">19/11/2019</div>
        </div>
        <div className="row flex">
          <div className="title">Project Title : </div>
          <div className="content">Product Management</div>
        </div>
        <div className="row flex">
          <div className="title">Description : </div>
          <div className="content">Invoice for Oct 2019</div>
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
              <td>70 hours</td>
              <td>$60000</td>
              <td>Infinity</td>
            </tr>

          </tbody>
        </table>
        <div className="total">Total: $123</div>
      </div>
    );
  }
}

export default withRouter(Invoice);
