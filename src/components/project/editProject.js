import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import ProjectForm from './projectForm';
import Input from '../common/Input';
import Select from '../common/Select';
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

    this.user = React.createRef();
    this.role = React.createRef();
    this.price = React.createRef();
    this.type = React.createRef();
  }

  componentDidMount() {
    const { id } = this.state;
    request(API.viewProject, { id }, ({ project }) => this.setState({ project }));
  }

  update = (data) => {
    const { id } = this.state;
    data.id = id;
    axios.put(API.updateProject, { data, id })
      .then(() => {
        window.alert('Project updated!');
      })
      .catch((err) => {
        window.alert(err.response.data.info || 'Project not updated!');
      });
  }

  addMember = () => {
    const {
      user: { current: { value: user } },
      role: { current: { value: role } },
      price: { current: { value: price } },
      type: { current: { value: type } },
    } = this;
    const { id } = this.state;
    const data = {
      username: user,
      project: id,
      role,
      price,
      type,
    };
    axios.post(API.assignMember, data)
      .then(({ data }) => {
        this.setState({ project: data.project });
        window.alert('User added!');
      })
      .catch((err) => window.alert(err.response.data.info || 'User not added!'));
  }

  removeMember = (userId) => {
    const { id: project } = this.state;
    axios.post(API.removeMember, { userId, project })
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
    const types = ['Hourly', 'Monthly', 'Other'];
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
              <div className="form-container">
                <h3>Add member to project - </h3>
                <Input
                  label="Username"
                  ref={this.user}
                />
                <Input
                  label="Role"
                  ref={this.role}
                />
                <Input
                  label="Price"
                  ref={this.price}
                  type="number"
                />
                <Select
                  label="Type"
                  ref={this.type}
                  options={types}
                />
                <button onClick={addMember}>Add member</button>
              </div>

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
