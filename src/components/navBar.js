/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { unSetToken } from '../utils';

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { history: { push } } = this.props;
    const nav = [
      { label: 'Login', onClick: () => { } },
    ];
    return (
      <div>
        {nav.map(({ label, onClick }) => <span key={label} onClick={onClick}>{`${label} `}</span>)}
        <span onClick={() => push('/login')}>Login </span>
        <span onClick={() => push('/register')}>Register </span>
        <span onClick={() => unSetToken()}>Logout </span>
      </div>
    );
  }
}

export default withRouter(NavBar);
