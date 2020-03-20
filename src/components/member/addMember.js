import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import MemberForm from './memberForm';
import { API } from '../../api';
import { addEntity } from '../../utils';

class AddMember extends Component {
  addMember = (data) => {
    const { onAdd } = this.props;
    addEntity(API.user.add, data, 'Member', ({ user }) => onAdd(user));
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
