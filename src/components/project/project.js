import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import Input from '../common/Input';
import Select from '../common/Select';
import { API } from '../../api';

class Project extends Component {
  constructor(props) {
    super(props);
    const { match: { params: { id } } } = props;
    this.state = {
      id,
      project: null,
      history: props.history,
    };

    this.user = React.createRef();
    this.role = React.createRef();
    this.price = React.createRef();
    this.type = React.createRef();
  }

  componentDidMount() {
    const { id } = this.state;
    axios.post(API.viewProject, { id })
      .then(({ data }) => {
        this.setState({ project: data.project });
      })
      .catch((err) => console.log(err.response));
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

  removeProject = () => {
    const { id, history: { push } } = this.state;
    axios.post(API.removeProject, { id })
      .then(() => {
        push('/project/all');
        window.alert('Project removed!');
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { id, project, history: { push } } = this.state;
    const { removeProject, addMember, removeMember } = this;
    const types = ['Hourly', 'Monthly', 'Other'];
    return (
      <>
        {project
          && (
            <div>
              <div className="details-container">
                <h3>Project Details - </h3>
                <button onClick={() => { push(`/project/${id}/invoice`); }}>Generate Invoice</button>
                <button onClick={() => removeProject()}>Remove</button>
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
                        <button onClick={() => removeMember(id)}>Remove</button>
                      </li>
                    ),
                  )}
                </ul>
              </div>
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
                  label="Username"
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

Project.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

Project.defaultProps = {};

export default withRouter(Project);
