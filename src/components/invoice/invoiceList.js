import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import CreateInvoice from './createInvoice';
import { API } from '../../api';

class InvoiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoices: [],
      history: props.history,
    };
  }

  componentDidMount() {
    axios.post(API.getInvoices)
      .then(({ data }) => this.setState({ invoices: data.invoices }))
      .catch((err) => console.log(err));
  }

  render() {
    const { invoices, history: { push } } = this.state;
    return (
      <>
        <CreateInvoice onAdd={this.updateList} />
        <h4>List of Invoices</h4>
        <ul className="list-container">
          { invoices.map((i) => {
            const {
              id,
              project: { name, client },
              start,
              end,
            } = i;
            return (
              <li key={id}>
                <strong onClick={() => { push(`/invoice/${id}`); }}>{`${name} (${client})`}</strong>
                <br />
                <small>{`${start} - ${end}`}</small>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

InvoiceList.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

InvoiceList.defaultProps = {};

export default withRouter(InvoiceList);