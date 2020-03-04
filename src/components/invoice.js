import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import html2canvas from 'html2canvas';
import JsPdf from 'jspdf';
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
    let { value } = event.target;
    const { project, project: { assignments } } = this.state;
    const colName = col === 0 ? 'title' : 'hours';
    const R = assignments[row];
    value = value === '' ? '0' : value;

    ReactDOM.unmountComponentAtNode(cell);
    if (R[colName] !== value) {
      if (colName === 'hours') {
        const newCost = R.price * value;
        project.total += newCost - R.cost;
        R.cost = newCost;
      }
      R[colName] = value;
    } else {
      ReactDOM.render(R[colName], cell);
    }
    this.setState({ project });
  }

  editCell = (event, row, col) => {
    const cell = event.target;
    const value = cell.innerHTML;
    ReactDOM.render(
      <input
        onBlur={(e) => { this.saveCell(e, row, col, cell); }}
        type={col === 0 ? 'text' : 'number'}
        defaultValue={value}
      />,
      cell,
    );
    cell.querySelector('input').focus();
  }

  generatePdf = () => {
    const domElement = document.getElementById('invoice');
    html2canvas(domElement,
      {
        scale: 2,
        onclone: (document) => {
          document.getElementById('printBtn').style.visibility = 'hidden';
        },
      })
      .then((canvas) => {
        const img = canvas.toDataURL('image/png');
        const pdf = new JsPdf('l', 'pt', [canvas.width, canvas.height]);
        pdf.addImage(img, 'JPEG', 0, 0, canvas.width, canvas.height);
        pdf.save('your-filename.pdf');
      });
  }

  render() {
    const { save, generatePdf, editCell } = this;
    const { project: p, invoiceNumber } = this.state;
    if (!p) return null;
    return (
      <div className="invoice" id="invoice">
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
        <button onClick={() => { save(); }}>Save Invoice</button>
        <button id="printBtn" onClick={() => { generatePdf(); }}>Generate PDF</button>
      </div>
    );
  }
}

Invoice.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};

Invoice.defaultProps = {};

export default withRouter(Invoice);
