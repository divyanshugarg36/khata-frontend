import React, { Component } from 'react';
import {
  Route, Switch, withRouter, Redirect,
} from 'react-router-dom';

import axios from 'axios';
import Login from './login';
import Register from './register';
import Dashboard from './dashboard';
import Profile from './profile';
import Project from './project';
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
          <Route path="/profile" component={Profile} />
          <Route path="/project" component={Project} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Khata);
