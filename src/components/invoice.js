import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
      invoiceNumber: Math.random().toString(32).slice(2, 7).toUpperCase(),
      project: null,
    };

    this.description = React.createRef();
  }

  componentDidMount() {
    const { id } = this.state;
    axios.post(API.viewProject, { id })
      .then(({ data }) => {
        const { assignments } = data.project;
        data.project.total = 0;
        data.project.assignments = assignments.map((a) => {
          a.title = `${a.role} (${a.name})`;
          a.hours = 0;
          a.cost = a.hours * a.price;
          data.project.total += a.cost;
          return a;
        });
        this.setState({ project: data.project });
      })
      .catch((err) => console.log(err.response));
  }

  save = () => {
    const { project, invoiceNumber } = this.state;
    axios.post(API.createInvoice, { invoiceNumber, project })
      .then(({ data }) => {
        if (data.success) {
          window.alert('Invoice saved!');
        }
      })
      .catch((err) => console.log(err.response));
  }

  saveCell = (event, row, col, cell) => {
    const { value } = event.target;
    const { project, project: { assignments } } = this.state;
    const colName = col === 0 ? 'title' : 'hours';

    if (colName === 'hours') {
      const newCost = assignments[row].price * value;
      project.total += newCost - assignments[row].cost;
      assignments[row].cost = newCost;
    }
    assignments[row][colName] = value;

    this.setState({ project });
    ReactDOM.unmountComponentAtNode(cell);
  }

  editCell = (event, row, col) => {
    const cell = event.target;
    const value = cell.innerHTML;
    ReactDOM.render(
      <input
        onBlur={(e) => { this.saveCell(e, row, col, cell); }}
        type={col === 0 ? 'text' : 'number'}
        defaultValue={value}
        min="0"
      />,
      cell,
    );
  }

  render() {
    const { save, editCell } = this;
    const { project: p, invoiceNumber } = this.state;
    if (!p) return null;
    return (
      <div className="invoice">
        <h1 className="logo">RYAZ</h1>
        <div className="sub-header">RYAZIO TECHNOLOGIES LLP</div>
        <div className="hr" />
        <div className="row flex">
          <div className="title">
            Invoice:
            { invoiceNumber }
          </div>
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
        <table role="grid" className="employee-data">
          <thead>
            <tr>
              <th>Item</th>
              <th>Total Hours</th>
              <th>Unit Price</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            { p.assignments.map((a, i) => (
              <tr key={a.id}>
                <td role="gridcell" onClick={(e) => { editCell(e, i, 0); }}>{a.title}</td>
                <td role="gridcell" onClick={(e) => { editCell(e, i, 1); }}>{a.hours}</td>
                <td>{a.price}</td>
                <td>{a.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total">
          Total: $
          {p.total}
        </div>
        <button onClick={() => { save(p); }}>Save Invoice</button>
      </div>
    );
  }
}

Invoice.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};

Invoice.defaultProps = {};

export default withRouter(Invoice);
