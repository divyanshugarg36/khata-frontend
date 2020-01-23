import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { API } from '../../api';

class Project extends Component {
  constructor(props) {
    super(props);
    const { match: { params: { id } } } = props;
    this.state = {
      id,
      assignment: null,
    };
  }

  componentDidMount() {
    const { id } = this.state;
    axios.post(API.viewProject, { id })
      .then(({ data }) => {
        this.setState({ assignment: data.assignment });
      })
      .catch((err) => console.log(err.response));
  }

  render() {
    const { assignment } = this.state;
    return (
      <>
        {assignment
        && (
          <div>
            <strong> Name - </strong>
            {assignment.project.name}
            <br />
            <strong> Description - </strong>
            {assignment.project.description}
            <br />
            <strong> Price - </strong>
            {assignment.price}
            <br />
            <strong> Type - </strong>
            {assignment.type}
          </div>
        )}
      </>
    );
  }
}

Project.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};

Project.defaultProps = {};

export default withRouter(Project);
