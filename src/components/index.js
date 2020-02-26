import React, { Component } from 'react';
import {
  Route, Switch, withRouter, Redirect,
} from 'react-router-dom';

import axios from 'axios';
import NavBar from './navBar';
import Login from './login';
import Register from './register';
import Dashboard from './dashboard';
import Profile from './profile';
import AddMember from './addMember';
import AddProject from './project/addProject';
import Project from './project/project';
import ProjectList from './project/projectList';
import History from './history';
import Invoice from './invoice';
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
        { getToken() && <NavBar /> }
        <Switch>
          <Redirect from="/" exact to="/login" />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/user/add" component={AddMember} />
          <Route path="/profile" component={Profile} />
          <Route path="/project/add" component={AddProject} />
          <Route path="/project/all" component={ProjectList} />
          <Route path="/project/:id" component={Project} />
          <Route path="/history" component={History} />
          <Route path="/invoice" component={Invoice} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Khata);
