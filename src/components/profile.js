import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Input from './common/Input';
import Select from './common/Select';
import { API } from '../api';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: ['Admin', 'Member'],
      types: ['Monthly', 'Hourly', 'Other'],
      fields: ['email', 'username', 'password', 'role', 'type'],
    };

    const { fields } = this.state;
    fields.forEach((el) => { this[el] = React.createRef(); });
  }

  updateProfile = (e) => {
    e.preventDefault();

    const data = {};
    const { fields } = this.state;
    fields.forEach((el) => {
      data[el] = this[el].current.value;
    });

    axios.put(API.login, data)
      .then(({ data }) => {
        console.log(data);
      }).catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { roles, types } = this.state;
    return (
      <div>
        <form onSubmit={this.updateProfile}>
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
            label="Password"
            ref={this.password}
            type="password"
          />
          <Select
            label="Role"
            ref={this.role}
            options={roles}
          />
          <Select
            label="Type"
            ref={this.type}
            options={types}
          />
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Profile);
