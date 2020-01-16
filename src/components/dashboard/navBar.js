/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { unSetToken } from '../../utils';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { history: { push } } = this.props;
    const nav = [
      { label: 'Logout', onClick: () => { unSetToken(); push('login'); } },
    ];
    return (
      <div>
        {nav.map(({ label, onClick }) => <span key={label} onClick={onClick}>{`${label} `}</span>)}
      </div>
    );
  }
}

NavBar.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

NavBar.defaultProps = {};


export default withRouter(NavBar);
