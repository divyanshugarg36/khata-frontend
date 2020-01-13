import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

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
        <input
          type="text"
          ref={this.username}
        />
        <input
          type="email"
          ref={this.email}
        />
        <input
          type="password"
          ref={this.password}
        />
        <button>Register</button>
      </form>
    );
  }
}

export default withRouter(Register);
