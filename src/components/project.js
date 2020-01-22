import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Input from './common/Input';
import { API } from '../api';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: [],
    };
    this.name = React.createRef();
    this.description = React.createRef();
  }

  componentDidMount() {
    axios.post(API.fetchProjects, {})
      .then(({ data }) => this.setState({ assignments: data.assignment }))
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
        window.alert('Project added!');
        const { assignments } = this.state;
        assignments.push(data.assignment);
        this.setState({ assignments });
      }).catch((err) => {
        window.alert(err.response.data.info || 'Project not added!');
      });
  }

  render() {
    const { addProject } = this;
    const { assignments } = this.state;
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
            { assignments.map((a) => {
              const {
                contributors,
                description,
                id,
                name,
              } = a.project;
              return (
                <li key={id}>
                  <strong>
                    {name}
                  </strong>
                  {` (${contributors.members.length} members)`}
                  <p>{description}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </>
    );
  }
}

export default withRouter(Project);
