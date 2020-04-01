import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import CreateInvoice from './createInvoice';
import { API } from '../../api';
import { getEntity } from '../../utils';

class InvoiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoices: [],
      history: props.history,
    };
  }

  componentDidMount() {
    const _isMounted = this.updater.isMounted(this);
    getEntity(API.invoice.all, '', ({ invoices }) => _isMounted && this.setState({ invoices }));
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
