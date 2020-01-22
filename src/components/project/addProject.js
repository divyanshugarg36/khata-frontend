import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Input from '../common/Input';
import Select from '../common/Select';
import { API } from '../../api';

class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: [],
    };
    this.name = React.createRef();
    this.description = React.createRef();
    this.price = React.createRef();
    this.type = React.createRef();
  }

  addProject = (e) => {
    e.preventDefault();
    const {
      name: { current: { value: name } },
      description: { current: { value: description } },
      price: { current: { value: price } },
      type: { current: { value: type } },
    } = this;
    const data = {
      name, description, price, type,
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
    const types = ['Hourly', 'Monthly', 'Other'];
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
            label="Price"
            ref={this.price}
            type="number"
          />
          <Select
            label="Type"
            ref={this.type}
            options={types}
          />
          <button>Add project</button>
        </form>
      </>
    );
  }
}

export default withRouter(AddProject);
