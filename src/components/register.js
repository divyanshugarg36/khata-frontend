import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Input from './ui/Input';

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.username = React.createRef();
    this.password = React.createRef();
    this.email = React.createRef();
  }

  onRegister = (e) => {
    e.preventDefault();
    const {
      email: { current: { value: email } },
      username: { current: { value: username } },
      password: { current: { value: password } },
    } = this;
    const data = {
      username, password, email,
    };
    axios.post('http://localhost:1337/register', data)
      .then(({ data }) => {
        console.log(data);
      }).catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { onRegister } = this;
    return (
      <form onSubmit={onRegister}>
        <Input
          label="Email"
          id="email"
          ref={this.email}
          type="email"
        />
        <Input
          label="Username"
          id="username"
          ref={this.username}
          type="text"
        />
        <Input
          label="Password"
          id="password"
          ref={this.password}
          type="password"
        />
        <button>Register</button>
      </form>
    );
  }
}

export default withRouter(Register);
