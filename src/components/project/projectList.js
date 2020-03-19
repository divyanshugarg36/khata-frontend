import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import AddProject from './addProject';
import { API } from '../../api';

class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      history: props.history,
    };
  }

  componentDidMount() {
    axios.post(API.project.all, {})
      .then(({ data }) => this.setState({ projects: data.projects }))
      .catch((err) => console.log(err));
  }

  updateList = (project) => {
    if (project) {
      const { projects } = this.state;
      projects.push(project);
      this.setState({ projects });
    }
  }

  render() {
    const { projects, history: { push } } = this.state;
    return (
      <>
        <AddProject onAdd={this.updateList} />
        <h4>List of projects</h4>
        <ul className="list-container">
          { projects.map((p) => {
            const {
              description,
              id,
              name,
            } = p;
            return (
              <li key={id}>
                <strong onClick={() => { push(`/project/${id}`); }}>{name}</strong>
                <p>{description}</p>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

ProjectList.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

ProjectList.defaultProps = {};

export default withRouter(ProjectList);
