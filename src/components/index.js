import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';


import Login from './login';
import Register from './register';
import Dashboard from './dashboard';
import Profile from './profile';

class Khata extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Khata);
