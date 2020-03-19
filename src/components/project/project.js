import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { API } from '../../api';
import { request } from '../../utils';

class Project extends Component {
  constructor(props) {
    super(props);
    const { match: { params: { id } } } = props;
    this.state = {
      id,
      project: null,
      history: props.history,
    };
  }

  componentDidMount() {
    const { id } = this.state;
    request(API.viewProject, { id }, ({ project }) => this.setState({ project }));
  }

  removeProject = () => {
    const { id, history: { push } } = this.state;
    request(API.removeProject, { id }, () => {
      push('/project/all');
      window.alert('Project removed!');
    });
  }

  render() {
    const { id, project, history: { push } } = this.state;
    const { removeProject } = this;
    return (
      <>
        {project
          && (
            <div>
              <div className="details-container">
                <h3>Project Details - </h3>
                <br />
                <strong> Name - </strong>
                {project.name}
                <br />
                <strong> Description - </strong>
                {project.description}
                <br />
                <strong> Client - </strong>
                {project.client}
                <br />
                <strong> Role - </strong>
                {project.role}
                <br />
                <strong>Members - </strong>
                <ul>
                  {project.assignments.map(
                    ({ id, name, username }) => (
                      <li key={id}>
                        { name || username }
                      </li>
                    ),
                  )}
                </ul>
              </div>
              <button onClick={() => { push(`/project/edit/${id}`); }}>Edit Project</button>
              <button onClick={() => removeProject()}>Remove</button>
            </div>
          )}
      </>
    );
  }
}

Project.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

Project.defaultProps = {};

export default withRouter(Project);
