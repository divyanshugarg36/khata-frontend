import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Input from './common/Input';
import { API } from '../api';
import { setToken, getToken } from '../utils';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.username = React.createRef();
    this.password = React.createRef();
  }

  componentDidMount() {
    const { history } = this.props;
    if (getToken() !== null) {
      history.push('/dashboard');
    }
  }


  onLogin = (e) => {
    e.preventDefault();
    const {
      username: { current: { value: username } },
      password: { current: { value: password } },
    } = this;
    const { history: { push } } = this.props;
    const data = {
      username, password,
    };
    axios.post(API.login, data)
      .then(({ data }) => {
        const { success, token } = data;
        if (success) {
          setToken(token);
          push('/dashboard');
        }
      }).catch((error) => {
        window.alert(error.response.data.info || 'Could not login!');
      });
  }

  render() {
    const { onLogin } = this;
    const { history: { push } } = this.props;
    return (
      <>
        <h3>Login</h3>
        <form onSubmit={onLogin}>
          <Input
            label="Username"
            ref={this.username}
          />
          <Input
            label="Password"
            ref={this.password}
            type="password"
          />
          <button>Login</button>
          <div onClick={() => push('/register')}>Dont have an account</div>
        </form>
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

Login.defaultProps = {};

export default withRouter(Login);
