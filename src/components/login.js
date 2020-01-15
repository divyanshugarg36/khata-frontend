import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Input from './ui/Input';
import { API } from '../api';
import { setToken } from '../utils';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.username = React.createRef();
    this.password = React.createRef();
  }

  onLogin = (e) => {
    e.preventDefault();
    const {
      username: { current: { value: username } },
      password: { current: { value: password } },
    } = this;
    const data = {
      username, password,
    };
    axios.post(API.login, data)
      .then(({ data }) => {
        console.log(data);
        const { success, token } = data;
        if (success) { setToken(token); }
      }).catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { onLogin } = this;
    return (
      <form onSubmit={onLogin}>
        <Input
          label="Username"
          id="username"
          ref={this.username}
        />
        <Input
          label="Password"
          id="password"
          ref={this.password}
          type="password"
        />
        <button>Login</button>
      </form>
    );
  }
}

export default withRouter(Login);
