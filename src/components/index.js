import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Login } from './login';
import { Register } from './register';

class Khata extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div>Welcome to Khata</div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </>
    );
  }
}

export default Khata;
