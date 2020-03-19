import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import MemberForm from './memberForm';
import { API } from '../../api';

class AddMember extends Component {
  addMember = (data) => {
    axios.post(API.user.add, data)
      .then(({ data }) => {
        window.alert('Member added!');
        const { onAdd } = this.props;
        onAdd(data.user);
      })
      .catch((err) => window.alert(err.response.data.info || 'Member not added!'));
  }

  render() {
    const { addMember } = this;
    return (
      <>
        <div className="form-container">
          <h3>Add new member - </h3>
          <MemberForm
            submitLabel="Add Member"
            onSubmit={addMember}
          />
        </div>
      </>
    );
  }
}

AddMember.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

AddMember.defaultProps = {};

export default withRouter(AddMember);
