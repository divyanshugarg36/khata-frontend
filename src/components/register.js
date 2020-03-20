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
      email,
      username,
      password,
    } = this;
    const { history: { push } } = this.props;
    const data = {
      username: username.current.value,
      password: password.current.value,
      email: email.current.value,
    };
    axios.post(API.user.register, data)
      .then(({ data }) => {
        window.alert('Registered successfully!');
        const { success, token } = data;
        if (success) {
          setToken(token);
          push('/dashboard');
        }
      }).catch((error) => {
        window.alert(error.response.data.info || 'Could not register');
      });
  }

  render() {
    const { onRegister } = this;
    const { history: { push } } = this.props;
    return (
      <>
        <h3>Register</h3>
        <form onSubmit={onRegister}>
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
