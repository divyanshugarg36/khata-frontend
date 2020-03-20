import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Input from '../common/Input';
import TextArea from '../common/TextArea';

class ProjectForm extends Component {
  constructor(props) {
    super(props);
    this.name = React.createRef();
    this.client = React.createRef();
    this.role = React.createRef();
    this.description = React.createRef();
    this.togglId = React.createRef();
  }

  onSubmitHandler = (e) => {
    e.preventDefault();
    const {
      name: { current: { value: name } },
      description: { current: { value: description } },
      client: { current: { value: client } },
      role: { current: { value: role } },
      togglId: { current: { value: togglId } },
    } = this;
    const data = {
      name, description, client, role, togglId,
    };
    const { onSubmit } = this.props;
    onSubmit(data);
  }

  render() {
    const { onSubmitHandler } = this;
    const { data, submitLabel } = this.props;
    const {
      name,
      description,
      client,
      role,
      togglId,
    } = data;
    return (
      <>
        <form onSubmit={onSubmitHandler}>
          <Input label="Name" ref={this.name} value={name || ''} />
          <TextArea label="Description" ref={this.description} value={description || ''} />
          <Input label="Client" ref={this.client} value={client || ''} />
          <Input label="Role" ref={this.role} value={role || ''} />
          <Input label="Toggl ID" ref={this.togglId} type="number" value={togglId || ''} />
          <button>{submitLabel}</button>
        </form>
      </>
    );
  }
}

ProjectForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Object),
  submitLabel: PropTypes.string,
};

ProjectForm.defaultProps = {
  submitLabel: 'Submit',
  data: {},
};

export default withRouter(ProjectForm);
