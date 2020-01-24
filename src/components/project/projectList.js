import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { API } from '../../api';

class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: [],
      history: props.history,
    };
  }

  componentDidMount() {
    axios.post(API.fetchProjects, {})
      .then(({ data }) => this.setState({ assignments: data.assignment }))
      .catch((err) => console.log(err));
  }

  removeProject = (id) => {
    axios.post(API.removeProject, { id })
      .then(() => {
        const { assignments } = this.state;
        assignments.forEach((item, index) => {
          if (item.project.id === id) {
            assignments.splice(index, 1);
          }
        });
        this.setState({ assignments });
        window.alert('Project removed!');
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { removeProject } = this;
    const { assignments, history: { push } } = this.state;
    return (
      <>
        <h4>List of projects</h4>
        <ul className="list-container">
          { assignments.map((a) => {
            const {
              description,
              id,
              name,
            } = a.project;
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
