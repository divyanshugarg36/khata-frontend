import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Login } from './login';
import { Register } from './register';

export class Khata extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div>Hello World</div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </>
    );
  }
}

export default Khata;
