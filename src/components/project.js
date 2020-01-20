import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Input from './common/Input';
import { API } from '../api';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
    };
    this.name = React.createRef();
    this.description = React.createRef();
  }

  componentDidMount() {
    axios.post(API.fetchProjects, {})
      .then(({ data }) => this.setState({ projects: data.projects }))
      .catch((err) => console.log(err));
  }

  addProject = (e) => {
    e.preventDefault();
    const {
      name: { current: { value: name } },
      description: { current: { value: description } },
    } = this;
    const data = {
      name, description,
    };
    axios.post(API.addProject, data)
      .then(({ data }) => {
        console.log('Project added!', data);
        const { projects } = this.state;
        projects.push(data.project);
        this.setState({ projects });
      }).catch((error) => {
        console.log('Project not added!', error);
      });
  }

  render() {
    const { addProject } = this;
    const { projects } = this.state;
    return (
      <>
        <div className="form-container">
          <h4>Add new project</h4>
          <form onSubmit={addProject}>
            <Input
              label="Name"
              ref={this.name}
            />
            <div className="textarea-container">
              <label htmlFor="description">
                Description
                <textarea
                  className="textarea"
                  id="description"
                  ref={this.description}
                />
              </label>
            </div>
            <button>Add project</button>
          </form>
        </div>
        <div className="container">
          <h4>List of projects</h4>
          <ul className="list-container">
            { projects.map((p) => (
              <li key={p.id}>
                <strong>
                  {p.name}
                </strong>
                <p>{p.description}</p>
              </li>
            )) }
          </ul>
        </div>
      </>
    );
  }
}

export default withRouter(Project);
