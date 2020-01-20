import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import axios from 'axios';
import PropTypes from 'prop-types';
// import { API } from '../../api';
import NavBar from './navBar';
import { getToken } from '../../utils';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { history: { push } } = this.props;
    const token = getToken();
    if (!token) {
      push('/login');
    }
    // axios.post(API.verifyToken, { token })
    //   .then(({ data }) => {
    //     console.log(data);
    //     const { success } = data;
    //     if (!success) {
    //       console.log('failed');
    //       push('/login');
    //     }
    //   }).catch((error) => {
    //     push('/login');
    //     console.log(error);
    //   });
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

Dashboard.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

Dashboard.defaultProps = {};

export default withRouter(Dashboard);
