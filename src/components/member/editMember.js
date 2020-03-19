import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import MemberForm from './memberForm';
import { API } from '../../api';
import { request } from '../../utils';

class EditMember extends Component {
  constructor(props) {
    super(props);
    const { match: { params: { id } } } = props;
    this.state = {
      id,
      member: null,
      history: props.history,
    };
  }

  componentDidMount() {
    const { id } = this.state;
    request(API.user.get, { id }, ({ user: member }) => this.setState({ member }));
  }

  removeMember = () => {
    const { id, history: { push } } = this.state;
    request(API.user.delete, { id }, () => {
      push('/member/all');
      window.alert('Member removed!');
    });
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
