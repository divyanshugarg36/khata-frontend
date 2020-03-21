import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import html2canvas from 'html2canvas';
import JsPdf from 'jspdf';
import { API } from '../../api';
import SubTaskTable from './components/subTaskTable';
import InvoiceInfo from './components/invoiceInfo';
import InvoiceTable from './components/invoiceTable';

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
    axios.post(API.invoice.get, { id })
      .then(({ data }) => {
        this.setState({ invoice: data.invoice });
        this.calculateCosts();
        this.fetchTogglHours();
      })
      .catch((err) => console.log(err.response));
  }

  fetchTogglHours = () => {
    axios.post(API.user.get)
      .then(({ data }) => {
        const { toggl, email } = data.user;
        const { workspaceId, apiToken } = toggl;
        const { invoice: { start, end } } = this.state;
        const info = {
          page: 1,
          totalCount: 0,
        };
        const params = {
          workspace_id: workspaceId,
          user_agent: email,
          since: start,
          until: end,
          page: info.page,
        };
        const fetchData = () => {
          axios.get(API.toggl.details, {
            params,
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
    axios.post(API.invoice.save, { invoice })
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
    const colName = col === 0 ? 'name' : 'hours';
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
    this.setState(() => invoice);
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
    const { editMode } = this.state;
    editMode.active = true;
    editMode.row = row;
    this.setState({ editMode });
  };

  updateSubTasks = (tasks) => {
    const { editMode, invoice } = this.state;
    const item = invoice.items[editMode.row];
    item.tasks = tasks;
    this.setState({ invoice, editMode: { active: false, row: 0 } });
    this.calculateCosts();
  }

  calculateCosts = () => {
    const { invoice } = this.state;
    let total = 0;
    invoice.items.forEach((a) => {
      if (a.hours !== 'NA' && a.tasks && a.tasks.length) {
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
    const { invoice: i, editMode } = this.state;
    if (!i) return null;
    return (
      <div className="invoice" id="invoice">
        {editMode.active && (
          <SubTaskTable
            tasks={i.items[editMode.row].tasks}
            onSave={this.updateSubTasks}
          />
        )}
        <h1 className="logo">RYAZ</h1>
        <div className="sub-header">RYAZIO TECHNOLOGIES LLP</div>
        <div className="hr" />
        <InvoiceInfo invoice={i} />
        <InvoiceTable invoice={i} onCellEdit={this.editCell} onEditSubTasks={this.editSubTasks} />
        <div className="total">{`Total: $${i.total}`}</div>
        <button onClick={this.save}>Save Invoice</button>
        <button id="printBtn" onClick={this.generatePdf}>Generate PDF</button>
      </div>
    );
  }
}

Invoice.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};

Invoice.defaultProps = {};

export default withRouter(Invoice);
