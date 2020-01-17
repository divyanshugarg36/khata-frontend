import React, { Component } from 'react';
import {
  Route, Switch, withRouter, Redirect,
} from 'react-router-dom';

import axios from 'axios';
import Login from './login';
import Register from './register';
import Dashboard from './dashboard';
import { getToken } from '../utils';

class Khata extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    axios.defaults.headers.common.Authorization = getToken();
    return (
      <div>
        <Switch>
          <Redirect from="/" exact to="/login" />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Khata);
