import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import { Login } from './login';
import { Register } from './register';
import { NavBar } from './navBar';

class Khata extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Route path="/" component={NavBar} />
        <div>Welcome to Khata</div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Khata);
