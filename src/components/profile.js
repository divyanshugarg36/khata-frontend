import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Input from './common/Input';
import { API } from '../api';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.name = React.createRef();
    this.email = React.createRef();
    this.username = React.createRef();
    this.oldPassword = React.createRef();
    this.newPassword = React.createRef();
    this.workspaceId = React.createRef();
    this.apiToken = React.createRef();
  }

  updateProfile = (e) => {
    e.preventDefault();

    const {
      name,
      email,
      username,
      oldPassword,
      newPassword,
      workspaceId,
      apiToken,
    } = this;

    const details = {
      name: name.current.value,
      email: email.current.value,
      username: username.current.value,
      oldPassword: oldPassword.current.value,
      newPassword: newPassword.current.value,
      toggl: {
        workspaceId: workspaceId.current.value,
        apiToken: apiToken.current.value,
      },
    };

    axios.post(API.verifyPassword, { password: details.oldPassword })
      .then(() => {
        axios.put(API.update, details)
          .then(() => {
            window.alert('Profile updated!');
          }).catch(() => {
            window.alert('Profile not updated!');
          });
      }).catch(() => {
        window.alert('Old password is incorrect!');
      });
  }

  render() {
    return (
      <div>
        <h3>Edit Profile</h3>
        <form onSubmit={this.updateProfile}>
          <Input
            label="Name"
            ref={this.name}
          />
          <Input
            label="Email"
            ref={this.email}
            type="email"
          />
          <Input
            label="Username"
            ref={this.username}
          />
          <Input
            label="Toggl Workspace ID"
            ref={this.workspaceId}
          />
          <Input
            label="Toggl API Token"
            ref={this.apiToken}
          />
          <Input
            label="Current Password"
            ref={this.oldPassword}
            type="password"
          />
          <Input
            label="New Password"
            ref={this.newPassword}
            type="password"
          />
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Profile);
