import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import MemberForm from './memberForm';
import { API } from '../../api';

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
    axios.post(API.fetchUser, { id })
      .then(({ data }) => {
        this.setState({ member: data.user });
      })
      .catch((err) => console.log(err.response));
  }

  removeMember = () => {
    const { id, history: { push } } = this.state;
    axios.post(API.deleteMember, { id })
      .then(() => {
        push('/member/all');
        window.alert('Member removed!');
      })
      .catch((err) => console.log(err));
  }

  update = (data) => {
    const { id } = this.state;
    data.id = id;
    axios.put(API.update, data)
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
