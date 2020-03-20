import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { API } from '../../api';
import { getEntity, deleteEntity } from '../../utils';

const Item = (props) => {
  const { label, value } = props;
  return (
    <div>
      <strong>{`${label} - `}</strong>
      {value}
    </div>
  );
};

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
              <h3>Project Details - </h3>
              <Item label="Name" value={project.name} />
              <Item label="Description" value={project.description} />
              <Item label="Client" value={project.client} />
              <Item label="Role" value={project.role} />
              <Item label="Members" value="" />
              <ul>
                {project.assignments.map(
                  ({ id, name, username }) => <li key={id}>{ name || username }</li>,
                )}
              </ul>
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

Item.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

Project.defaultProps = {};

export default withRouter(Project);
