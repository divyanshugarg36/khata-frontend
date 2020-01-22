import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { API } from '../../api';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      project: {},
    };
  }

  componentDidMount() {
    const { id } = this.state;
    axios.post(API.viewProject, { id })
      .then(({ data }) => this.setState({ project: data.project }))
      .catch((err) => console.log(err.response));
  }

  render() {
    const { project } = this.state;
    return (
      <>
        <div>
          <strong> Name - </strong>
          {project.name}
          <br />
          <strong> Description - </strong>
          {project.description}
        </div>
      </>
    );
  }
}

export default withRouter(Project);
