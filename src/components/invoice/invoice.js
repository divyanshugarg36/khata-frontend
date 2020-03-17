import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import html2canvas from 'html2canvas';
import JsPdf from 'jspdf';
import { API } from '../../api';

class Invoice extends Component {
  constructor(props) {
    super(props);
    const { match: { params: { id } } } = props;
    this.state = {
      id,
      invoice: null,
      editMode: {
        active: false,
        row: 0,
      },
    };
  }

  componentDidMount() {
    const { id } = this.state;
    axios.post(API.viewInvoice, { id })
      .then(({ data }) => {
        this.setState({ invoice: data.invoice });
        this.fetchTogglHours();
      })
      .catch((err) => console.log(err.response));
  }

  fetchTogglHours = () => {
    axios.post(API.fetchUser)
      .then(({ data }) => {
        const { toggl, email } = data.user;
        const { workspaceId, apiToken } = toggl;
        const { invoice: { start, end } } = this.state;
        const info = {
          page: 1,
          totalCount: 0,
        };

        const fetchData = () => {
          axios.get('https://toggl.com/reports/api/v2/details', {
            params: {
              workspace_id: workspaceId,
              user_agent: email,
              since: start,
              until: end,
              page: info.page,
            },
            headers: {
              Authorization: `Basic ${window.btoa(`${apiToken}:api_token`)}`,
            },
          })
            .then(({ data: response }) => {
              info.totalCount = response.total_count;
              const { invoice, invoice: { items, project: { togglId } } } = this.state;
              const entries = response.data.filter((e) => e.pid === Number(togglId));
              entries.forEach((e) => {
                const item = items.find((i) => e.uid === Number(i.uid));
                item.hours += parseInt((e.dur / (1000 * 60 * 60)) / 24, 10);
              });
              this.setState({ invoice });
              this.calculateCosts();
              if (info.totalCount > (info.page * 50)) {
                info.page += 1;
                fetchData();
              }
            })
            .catch((err) => console.log(err.response));
        };
        fetchData();
      });
  }

  save = () => {
    const { invoice } = this.state;
    axios.post(API.saveInvoice, { invoice })
      .then(({ data }) => {
        if (data.success) {
          window.alert('Invoice saved!');
        }
      })
      .catch((err) => console.log(err.response));
  }

  saveCell = (event, row, col, cell) => {
    let { value } = event.target;
    const { invoice, invoice: { items } } = this.state;
    const colName = col === 0 ? 'title' : 'hours';
    const R = items[row];
    value = value === '' ? '0' : value;

    ReactDOM.unmountComponentAtNode(cell);
    if (R[colName] !== value) {
      if (colName === 'hours') {
        const newCost = R.price * value;
        invoice.total += newCost - R.cost;
        R.cost = newCost;
      }
      R[colName] = value;
    } else {
      ReactDOM.render(R[colName], cell);
    }
    this.setState({ invoice });
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
    const { editMode, invoice } = this.state;
    editMode.active = true;
    editMode.row = row;
    this.setState({ editMode });
    if (invoice.items[editMode.row].tasks.length === 0) {
      this.addRow();
    }
  };

  addRow = () => {
    const { editMode, invoice } = this.state;
    invoice.items[editMode.row].tasks.push({ title: '', hours: 0 });
    this.setState({ invoice });
  }

  removeRow = (taskNo) => {
    const { editMode, invoice } = this.state;
    invoice.items[editMode.row].tasks.splice(taskNo, 1);
    this.setState({ invoice });
    this.calculateCosts();
  }

  updateSubTasks = (event, taskNo, col) => {
    const { value } = event.target;
    const { editMode, invoice } = this.state;
    const item = invoice.items[editMode.row];
    item.tasks[taskNo][col] = value;
    if (col === 'hours') {
      this.calculateCosts();
    }
    this.setState({ invoice });
  }

  calculateCosts = () => {
    const { invoice } = this.state;
    let total = 0;
    invoice.items.forEach((a) => {
      if (a.hours !== 'NA' && a.tasks.length) {
        let hours = 0;
        a.tasks.forEach((t) => { hours += Number(t.hours); });
        a.hours = hours;
      }
      a.cost = a.hours === 'NA' ? a.price : a.hours * a.price;
      total += Number(a.cost);
    });
    invoice.total = total;
    this.setState({ invoice });
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
    const { invoice: i, editMode } = this.state;
    if (!i) return null;
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
                {i.items[editMode.row].tasks.map((t, i) => (
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
            { i.invoiceNumber }
          </div>
        </div>
        <div className="row flex">
          <div className="title">Attention : </div>
          <div className="content">
            { i.project.client }
            <br />
            { i.project.name }
          </div>
        </div>
        <div className="row flex">
          <div className="title">Date : </div>
          <div className="content">{ `${i.start} - ${i.end}` }</div>
        </div>
        <div className="row flex">
          <div className="title">Project Title : </div>
          <div className="content">{ i.project.role }</div>
        </div>
        <div className="row flex">
          <div className="title">Description : </div>
          <div className="content">{ i.description }</div>
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
            { i.items.map((item, i) => (
              <tr key={i}>
                <td role="gridcell" onClick={(e) => { editCell(e, i, 0); }}>
                  <span>{item.name}</span>
                  {item.type === 'Hourly' && (
                  <button style={{ float: 'right' }} onClick={() => editSubTasks(i)}>
                    Edit Sub-tasks
                  </button>
                  )}
                  {!!item.tasks.length
                  && <ul>{item.tasks.map((t, i) => <li key={i}>{t.title}</li>)}</ul>}
                </td>
                <td role="gridcell" onClick={(e) => { editCell(e, i, 1); }}>
                  <span>{item.hours}</span>
                  {item.tasks && <ul>{item.tasks.map((t, i) => <li key={i}>{t.hours}</li>)}</ul>}
                </td>
                <td>{item.price}</td>
                <td>{item.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total">
          Total: $
          {i.total}
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
