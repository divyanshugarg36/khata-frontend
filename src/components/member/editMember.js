import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import Input from '../common/Input';
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

    this.username = React.createRef();
    this.name = React.createRef();
    this.email = React.createRef();
    this.togglUid = React.createRef();
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

  update = () => {
    const { id } = this.state;
    const {
      username: { current: { value: username } },
      name: { current: { value: name } },
      email: { current: { value: email } },
      togglUid: { current: { value: togglUid } },
    } = this;
    const data = {
      id,
      username,
      name,
      email,
      toggl: {
        uid: togglUid,
      },
    };
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
              <Input
                label="Name"
                ref={this.name}
                value={member.name}
              />
              <Input
                label="Username"
                ref={this.username}
                value={member.username}
              />
              <Input
                label="Email"
                ref={this.email}
                type="email"
                value={member.email}
              />
              <Input
                label="Toggl UID"
                type="number"
                ref={this.togglUid}
                value={member.toggl.uid}
              />
              <button onClick={update}>Update</button>
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
