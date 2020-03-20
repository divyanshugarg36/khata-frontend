import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProjectForm from './projectForm';
import { API } from '../../api';
import { addEntity } from '../../utils';

class AddProject extends Component {
  addProject = (data) => {
    addEntity(API.project.add, data, 'Project', (data) => {
      const { onAdd } = this.props;
      onAdd(data.project);
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
