import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Input from './common/Input';
import { API } from '../api';
import { getEntity } from '../utils';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    this.name = React.createRef();
    this.email = React.createRef();
    this.username = React.createRef();
    this.workspaceId = React.createRef();
    this.apiToken = React.createRef();

    this.newPassword = React.createRef();
    this.oldPassword = React.createRef();
  }

  componentDidMount() {
    const _isMounted = this.updater.isMounted(this);
    getEntity(API.user.get, '', (data) => _isMounted && this.setState({ user: data.user }));
  }

  updateProfile = (e) => {
    e.preventDefault();

    const {
      name,
      email,
      username,
      workspaceId,
      apiToken,
    } = this;
    const details = {
      name: name.current.value,
      email: email.current.value,
      username: username.current.value,
      toggl: {
        workspaceId: workspaceId.current.value,
        apiToken: apiToken.current.value,
      },
    };
    this.update(API.user.update.profile, details, 'Profile');
  }

  updatePassword = (e) => {
    const {
      oldPassword: { current: { value: oldPassword } },
      newPassword: { current: { value: newPassword } },
    } = this;
    const details = { oldPassword, password: newPassword };
    e.preventDefault();

    axios.post(API.verify, { password: details.oldPassword })
      .then(() => {
        this.update(API.user.update.password, details, 'Password');
      })
      .catch(() => {
        window.alert('Old password is incorrect!');
      });
  }

  update = (url, data, entity) => {
    axios.post(url, data)
      .then(() => {
        window.alert(`${entity} updated!`);
      }).catch(() => {
        window.alert(`${entity} not updated!`);
      });
  }

  render() {
    const { user } = this.state;
    if (!user) return null;
    return (
      <div>
        <h3>Edit Profile</h3>
        <form onSubmit={this.updateProfile}>
          <Input label="Name" ref={this.name} value={user.name || ''} />
          <Input label="Email" ref={this.email} type="email" value={user.email || ''} />
          <Input label="Username" ref={this.username} value={user.username || ''} />
          <Input label="Toggl Workspace ID" ref={this.workspaceId} value={user.toggl.workspaceId || ''} />
          <Input label="Toggl API Token" ref={this.apiToken} value={user.toggl.apiToken || ''} />
          <button type="submit">Save</button>
        </form>

        <h3>Update password</h3>
        <form onSubmit={this.updatePassword}>
          <Input label="Current Password" ref={this.oldPassword} type="password" />
          <Input label="New Password" ref={this.newPassword} type="password" />
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Profile);
