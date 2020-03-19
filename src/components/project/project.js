import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { API } from '../../api';
import { getEntity, deleteEntity } from '../../utils';

class Project extends Component {
  constructor(props) {
    super(props);
    const { params: { id } } = props.match;
    this.id = id;
    this.history = props.history;
    this.state = {
      project: null,
    };
  }

  componentDidMount() {
    getEntity(API.project.get, { id: this.id }, ({ project }) => this.setState({ project }));
  }

  removeProject = () => {
    deleteEntity(API.project.remove, { id: this.id }, this.history, 'Project');
  }

  render() {
    const { project } = this.state;
    const { id, removeProject, history: { push } } = this;
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
