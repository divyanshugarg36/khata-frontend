import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import ProjectForm from './projectForm';
import AddMemberForm from './addMemberForm';
import { API } from '../../api';
import { request } from '../../utils';

class EditProject extends Component {
  constructor(props) {
    super(props);
    const { match: { params: { id } } } = props;
    this.state = {
      id,
      project: null,
    };
  }

  componentDidMount() {
    const { id } = this.state;
    request(API.project.get, { id }, ({ project }) => this.setState({ project }));
  }

  update = (data) => {
    const { id } = this.state;
    data.id = id;
    axios.put(API.project.update, { data, id })
      .then(() => {
        window.alert('Project updated!');
      })
      .catch((err) => {
        window.alert(err.response.data.info || 'Project not updated!');
      });
  }

  addMember = (data) => {
    const { id } = this.state;
    data.project = id;
    axios.post(API.project.assign, data)
      .then(({ data }) => {
        this.setState({ project: data.project });
        window.alert('User added!');
      })
      .catch((err) => window.alert(err.response.data.info || 'User not added!'));
  }

  removeMember = (userId) => {
    const { id: project } = this.state;
    axios.post(API.project.unassign, { userId, project })
      .then(() => {
        const { project } = this.state;
        const { assignments } = project;
        assignments.forEach((item, index) => {
          if (item.id === userId) {
            assignments.splice(index, 1);
          }
        });
        this.setState({ project });
        window.alert('User removed!');
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { update, removeMember, addMember } = this;
    const { project } = this.state;
    return (
      <>
        {project
          && (
            <div>
              <h3>Edit Project details - </h3>
              <ProjectForm
                data={project}
                onSubmit={update}
                submitLabel="Update"
              />
              <br />
              <br />
              <strong>Members - </strong>
              <ul>
                {project.assignments.map(
                  ({ id, name, username }) => (
                    <li key={id}>
                      { name || username }
                      <button onClick={() => removeMember(id)}>Remove</button>
                    </li>
                  ),
                )}
              </ul>
              <h3>Add member to project - </h3>
              <AddMemberForm onSubmit={addMember} />
            </div>
          )}
      </>
    );
  }
}

EditProject.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};

EditProject.defaultProps = {};

export default withRouter(EditProject);
