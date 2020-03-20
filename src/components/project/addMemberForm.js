import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Input from '../common/Input';
import Select from '../common/Select';

class AddMemberForm extends Component {
  constructor(props) {
    super(props);

    this.user = React.createRef();
    this.role = React.createRef();
    this.price = React.createRef();
    this.type = React.createRef();
  }

  onSubmitHandler = (e) => {
    e.preventDefault();
    const {
      user,
      role,
      price,
      type,
    } = this;
    const data = {
      username: user.current.value,
      role: role.current.value,
      price: price.current.value,
      type: type.current.value,
    };
    const { onSubmit } = this.props;
    onSubmit(data);
  }

  render() {
    const { onSubmitHandler } = this;
    const types = ['Hourly', 'Monthly', 'Other'];
    return (
      <>
        <form onSubmit={onSubmitHandler}>
          <Input label="Username" ref={this.user} />
          <Input label="Role" ref={this.role} />
          <Input label="Price" ref={this.price} type="number" />
          <Select label="Type" ref={this.type} options={types} />
          <button type="submit">Add member</button>
        </form>
      </>
    );
  }
}

AddMemberForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

AddMemberForm.defaultProps = {};

export default withRouter(AddMemberForm);
