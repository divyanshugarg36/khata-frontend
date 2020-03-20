import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import ProjectForm from './projectForm';
import AddMemberForm from './addMemberForm';
import { API } from '../../api';
import { getEntity } from '../../utils';

class EditProject extends Component {
  constructor(props) {
    super(props);
    const { match: { params: { id } } } = props;
    this.id = id;
    this.state = {
      project: null,
    };
  }

  componentDidMount() {
    getEntity(API.project.get, { id: this.id }, ({ project }) => this.setState({ project }));
  }

  update = (data) => {
    data.id = this.id;
    axios.put(API.project.update, { data, id: this.id })
      .then(() => {
        window.alert('Project updated!');
      })
      .catch((err) => {
        window.alert(err.response.data.info || 'Project not updated!');
      });
  }

  addMember = (data) => {
    data.project = this.id;
    axios.post(API.project.assign, data)
      .then(({ data }) => {
        this.setState({ project: data.project });
        window.alert('User added!');
      })
      .catch((err) => window.alert(err.response.data.info || 'User not added!'));
  }

  removeMember = (userId) => {
    axios.post(API.project.unassign, { userId, project: this.id })
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
              <ProjectForm data={project} onSubmit={update} submitLabel="Update" />
              <br />
              <h3>Members - </h3>
              <ul>
                {project.assignments.map(({ id, name, username }) => (
                  <li key={id}>
                    { name || username }
                    <button onClick={() => removeMember(id)}>Remove</button>
                  </li>
                ))}
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
