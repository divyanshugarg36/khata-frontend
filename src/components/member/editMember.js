import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import MemberForm from './memberForm';
import { API } from '../../api';
import { getEntity, deleteEntity } from '../../utils';

class EditMember extends Component {
  constructor(props) {
    super(props);
    const { match, history } = props;
    this.history = history;
    this.id = match.params.id;
    this.state = {
      member: null,
    };
  }

  componentDidMount() {
    getEntity(API.user.get, { id: this.id }, ({ user: member }) => this.setState({ member }));
  }

  removeMember = () => {
    deleteEntity(API.user.delete, { id: this.id }, this.history, 'Member');
  }

  update = (data) => {
    const { id } = this.state;
    data.id = id;
    axios.put(API.user.update.profile, data)
      .then(() => {
        window.alert('Member details updated!');
      })
      .catch((err) => {
        window.alert(err.response.data.info || 'Member details not updated!');
      });
  }

  render() {
    const { removeMember, update } = this;
    const { member } = this.state;
    return (
      <>
        {member
          && (
            <div>
              <button onClick={() => { removeMember(); }}>Remove Member</button>
              <h3>Edit member details - </h3>
              <MemberForm
                data={member}
                submitLabel="Update"
                onSubmit={update}
              />
            </div>
          )}
      </>
    );
  }
}

EditMember.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

EditMember.defaultProps = {};

export default withRouter(EditMember);
