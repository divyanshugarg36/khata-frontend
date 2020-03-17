import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Input from '../common/Input';
import { API } from '../../api';

class CreateInvoice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
    };
    this.project = React.createRef();
    this.start = React.createRef();
    this.end = React.createRef();
  }

  componentDidMount() {
    axios.post(API.fetchProjects)
      .then(({ data }) => {
        this.setState({ projects: data.projects });
      })
      .catch((e) => console.log(e));
  }

  create = (e) => {
    e.preventDefault();
    const {
      project: { current: { value: project } },
      start: { current: { value: start } },
      end: { current: { value: end } },
    } = this;
    const data = {
      project, start, end,
    };
    axios.post(API.createInvoice, data)
      .then(({ data }) => {
        const { history: { push } } = this.props;
        push(`/invoice/${data.invoice.id}`);
      }).catch((err) => {
        window.alert(err.response.data.info || 'Cannot create invoice!');
      });
  }

  render() {
    const { create } = this;
    const { projects } = this.state;
    return (
      <>
        <h4>Create a new invoice</h4>
        <form onSubmit={create}>
          <label htmlFor="project">
            Project
            <br />
            <select ref={this.project} id="project">
              { projects.map((p) => <option key={p.id} value={p.id}>{`${p.name} (${p.client})`}</option>) }
            </select>
          </label>
          <Input
            label="Starting Date"
            ref={this.start}
            type="date"
          />
          <Input
            label="Ending Date"
            ref={this.end}
            type="date"
          />
          <button>Create Invoice</button>
        </form>
      </>
    );
  }
}

CreateInvoice.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

CreateInvoice.defaultProps = {};

export default withRouter(CreateInvoice);
