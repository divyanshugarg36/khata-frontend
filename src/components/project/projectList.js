import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
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
    axios.post(API.fetchProjects, {})
      .then(({ data }) => this.setState({ projects: data.projects }))
      .catch((err) => console.log(err));
  }

  removeProject = (id) => {
    axios.post(API.removeProject, { id })
      .then(() => {
        const { projects } = this.state;
        projects.forEach((item, index) => {
          if (item.id === id) {
            projects.splice(index, 1);
          }
        });
        this.setState({ projects });
        window.alert('Project removed!');
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { removeProject } = this;
    const { projects, history: { push } } = this.state;
    return (
      <>
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
                <button onClick={() => removeProject(id)}>Remove</button>
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
