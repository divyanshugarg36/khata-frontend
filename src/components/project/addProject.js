import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import ProjectForm from './projectForm';
import { API } from '../../api';

class AddProject extends Component {
  addProject = (data) => {
    axios.post(API.project.add, data)
      .then(({ data }) => {
        window.alert('Project added!');
        const { onAdd } = this.props;
        onAdd(data.project);
      }).catch((err) => {
        window.alert(err.response.data.info || 'Project not added!');
      });
  }

  render() {
    const { addProject } = this;
    return (
      <>
        <h4>Add new project</h4>
        <ProjectForm
          onSubmit={addProject}
          submitLabel="Add Project"
        />
      </>
    );
  }
}

AddProject.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

AddProject.defaultProps = {};

export default withRouter(AddProject);
