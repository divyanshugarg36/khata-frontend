import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Input from '../common/Input';
import { API } from '../../api';

class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.name = React.createRef();
    this.client = React.createRef();
    this.role = React.createRef();
    this.description = React.createRef();
  }

  addProject = (e) => {
    e.preventDefault();
    const {
      name: { current: { value: name } },
      description: { current: { value: description } },
      client: { current: { value: client } },
      role: { current: { value: role } },
    } = this;
    const data = {
      name, description, client, role,
    };
    axios.post(API.addProject, data)
      .then(() => {
        window.alert('Project added!');
      }).catch((err) => {
        window.alert(err.response.data.info || 'Project not added!');
      });
  }

  render() {
    const { addProject } = this;
    return (
      <>
        <h4>Add new project</h4>
        <form onSubmit={addProject}>
          <Input
            label="Name"
            ref={this.name}
          />
          <div className="textarea-container">
            <label htmlFor="description">
              Description
              <br />
              <textarea
                className="textarea"
                id="description"
                ref={this.description}
              />
            </label>
          </div>
          <Input
            label="Client"
            ref={this.client}
          />
          <Input
            label="Role"
            ref={this.role}
          />
          <button>Add project</button>
        </form>
      </>
    );
  }
}

export default withRouter(AddProject);
