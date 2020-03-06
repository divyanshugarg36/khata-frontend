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
      editMode: {
        active: false,
        row: 0,
      },
    };
  }

  componentDidMount() {
    const { id } = this.state;
    axios.post(API.viewProject, { id })
      .then(({ data }) => {
        const { assignments } = data.project;
        data.project.total = 0;
        data.project.assignments = assignments.map((a) => {
          a.title = `${a.role} (${a.name})`;
          a.hours = a.type === 'Hourly' ? 0 : 'NA';
          a.tasks = [];
          return a;
        });
        this.setState({ project: data.project });
        this.calculateCosts();
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
    if (event.target.tagName !== 'TD') return;
    const cell = event.target.querySelector('span');
    const value = cell.innerHTML;
    if (value === 'NA') return;
    ReactDOM.render(
      <input
        onBlur={(e) => { this.saveCell(e, row, col, cell); }}
        type={col === 0 ? 'text' : 'number'}
        defaultValue={value}
        ref={(i) => i && i.focus()}
      />,
      cell,
    );
  }

  generatePdf = () => {
    const domElement = document.getElementById('invoice');
    html2canvas(domElement,
      {
        scale: 2,
        onclone: (document) => {
          document.querySelectorAll('button').forEach((b) => { b.style.visibility = 'hidden'; });
        },
      })
      .then((canvas) => {
        const img = canvas.toDataURL('image/png');
        const pdf = new JsPdf('l', 'pt', [canvas.width, canvas.height]);
        pdf.addImage(img, 'JPEG', 0, 0, canvas.width, canvas.height);
        pdf.save('your-filename.pdf');
      });
  }

  editSubTasks = (row) => {
    const { editMode, project } = this.state;
    editMode.active = true;
    editMode.row = row;
    this.setState({ editMode });
    if (project.assignments[editMode.row].tasks.length === 0) {
      this.addRow();
    }
  };

  addRow = () => {
    const { editMode, project } = this.state;
    project.assignments[editMode.row].tasks.push({ title: '', hours: 0 });
    this.setState({ project });
  }

  removeRow = (taskNo) => {
    const { editMode, project } = this.state;
    project.assignments[editMode.row].tasks.splice(taskNo, 1);
    this.setState({ project });
    this.calculateCosts();
  }

  updateSubTasks = (event, taskNo, col) => {
    const { value } = event.target;
    const { editMode, project } = this.state;
    const item = project.assignments[editMode.row];
    item.tasks[taskNo][col] = value;
    if (col === 'hours') {
      this.calculateCosts();
    }
    this.setState({ project });
  }

  calculateCosts = () => {
    const { project } = this.state;
    let total = 0;
    project.assignments.forEach((a) => {
      if (a.hours !== 'NA' && a.tasks.length) {
        let hours = 0;
        a.tasks.forEach((t) => { hours += Number(t.hours); });
        a.hours = hours;
      }
      a.cost = a.hours === 'NA' ? a.price : a.hours * a.price;
      total += Number(a.cost);
    });
    project.total = total;
    this.setState({ project });
  }

  render() {
    const {
      save,
      generatePdf,
      editCell,
      editSubTasks,
      addRow,
      removeRow,
      updateSubTasks,
    } = this;
    const { project: p, invoiceNumber, editMode } = this.state;
    if (!p) return null;
    return (
      <div className="invoice" id="invoice">
        {editMode.active && (
          <div className="edit-mode-table">
            <br />
            <table border="1">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Hours</th>
                  <th><button onClick={addRow}>Add row</button></th>
                </tr>
              </thead>
              <tbody>
                {p.assignments[editMode.row].tasks.map((t, i) => (
                  <tr key={Math.random().toString(32).slice(2, 7)}>
                    <td><input onBlur={(e) => updateSubTasks(e, i, 'title')} type="text" defaultValue={t.title} /></td>
                    <td><input onBlur={(e) => updateSubTasks(e, i, 'hours')} type="number" defaultValue={t.hours} /></td>
                    <td><button onClick={() => removeRow(i)}>x</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={() => this.setState({ editMode: { active: false, row: 0 } })}>
              Save Tasks
            </button>
          </div>
        )}
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
                <td role="gridcell" onClick={(e) => { editCell(e, i, 0); }}>
                  <span>{a.title}</span>
                  {a.type === 'Hourly' && <button style={{ float: 'right' }} onClick={() => editSubTasks(i)}>Edit Sub-tasks</button>}
                  {!!a.tasks.length && <ul>{a.tasks.map((t, i) => <li key={i}>{t.title}</li>)}</ul>}
                </td>
                <td role="gridcell" onClick={(e) => { editCell(e, i, 1); }}>
                  <span>{a.hours}</span>
                  {a.tasks && <ul>{a.tasks.map((t, i) => <li key={i}>{t.hours}</li>)}</ul>}
                </td>
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
