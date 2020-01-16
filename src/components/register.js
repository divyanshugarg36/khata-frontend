import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Input from './common/Input';
import { API } from '../api';
import { setToken, getToken } from '../utils';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.username = React.createRef();
    this.password = React.createRef();
    this.email = React.createRef();
  }

  componentDidMount() {
    const { history: { push } } = this.props;
    if (getToken()) {
      push('/dashboard');
    }
  }

  onRegister = (e) => {
    e.preventDefault();
    const {
      email: { current: { value: email } },
      username: { current: { value: username } },
      password: { current: { value: password } },
    } = this;
    const { history: { push } } = this.props;
    const data = {
      username, password, email,
    };
    axios.post(API.register, data)
      .then(({ data }) => {
        console.log(data);
        const { success, token } = data;
        if (success) {
          setToken(token);
          push('/dashboard');
        }
      }).catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { onRegister } = this;
    const { history: { push } } = this.props;
    return (
      <>
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
          />
          <Input
            label="Password"
            id="password"
            ref={this.password}
            type="password"
          />
          <button>Register</button>
        </form>
        <div onClick={() => push('/login')}>Already have an account</div>
      </>
    );
  }
}

Register.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

Register.defaultProps = {};


export default withRouter(Register);
