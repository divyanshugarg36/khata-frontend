import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import axios from 'axios';
// import { API } from '../api';
// import { setToken } from '../utils';
import NavBar from './navBar';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <>
        <NavBar />
        <div>Welcome to the dashboard</div>
      </>
    );
  }
}

export default withRouter(Dashboard);
