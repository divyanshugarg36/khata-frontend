import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { API } from '../api';

class Invoice extends Component {
  constructor(props) {
    super(props);
    const { match: { params: { id } } } = props;
    this.state = {
      id,
      project: null,
    };
  }

  componentDidMount() {
    const { id } = this.state;
    axios.post(API.viewProject, { id })
      .then(({ data }) => {
        this.setState({ project: data.project });
      })
      .catch((err) => console.log(err.response));
  }

  save = (project) => {
    axios.post(API.createInvoice, { invoiceNumber: 'B1', project })
      .then(({ data }) => {
        if (data.success) {
          window.alert('Invoice saved!');
        }
      })
      .catch((err) => console.log(err.response));
  }

  render() {
    const { project: p } = this.state;
    if (!p) return null;
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
            { p.client }
            <br />
            { p.name }
          </div>
        </div>
        <div className="row flex">
          <div className="title">Date : </div>
          <div className="content">{ new Date().toDateString() }</div>
        </div>
        <div className="row flex">
          <div className="title">Project Title : </div>
          <div className="content">{ p.role }</div>
        </div>
        <div className="row flex">
          <div className="title">Description : </div>
          <div className="content">{ p.description }</div>
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
            { p.assignments.map((a) => (
              <tr key={a.id}>
                <td>{`${a.role} (${a.name})`}</td>
                <td>--</td>
                <td>{a.price}</td>
                <td>{a.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total">
          Total: $
          {p.assignments.reduce((a, b) => Number(a.price) + Number(b.price))}
        </div>
        <button onClick={() => { this.save(p); }}>Save Invoice</button>
      </div>
    );
  }
}

Invoice.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};

Invoice.defaultProps = {};

export default withRouter(Invoice);
