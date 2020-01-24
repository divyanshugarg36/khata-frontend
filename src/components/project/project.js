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
      assignment: null,
    };

    this.user = React.createRef();
    this.price = React.createRef();
    this.type = React.createRef();
  }

  componentDidMount() {
    const { id } = this.state;
    axios.post(API.viewProject, { id })
      .then(({ data }) => {
        this.setState({ assignment: data.assignment });
      })
      .catch((err) => console.log(err.response));
  }

  addMember = () => {
    const {
      user: { current: { value: user } },
      price: { current: { value: price } },
      type: { current: { value: type } },
    } = this;
    const { id } = this.state;
    const data = {
      user,
      project: id,
      price,
      type,
    };
    axios.post(API.addMember, data)
      .then(({ data }) => {
        this.setState({ assignment: data.assignment });
        window.alert('User added!');
      })
      .catch((err) => window.alert(err.response.data.info || 'User not added!'));
  }

  render() {
    const { assignment } = this.state;
    const { addMember } = this;
    const types = ['Hourly', 'Monthly', 'Other'];
    console.log(assignment);
    return (
      <>
        {assignment
          && (
            <div>
              <div className="details-container">
                <h3>Project Details - </h3>
                <strong> Name - </strong>
                {assignment.project.name}
                <br />
                <strong> Description - </strong>
                {assignment.project.description}
                <br />
                <strong> Price - </strong>
                {assignment.price}
                <br />
                <strong> Type - </strong>
                {assignment.type}
                <br />
                <strong> Admin - </strong>
                {assignment.project.contributors.admin.name}
                <br />
                <strong> Other members - </strong>
                <ul>
                  {assignment.project.contributors.members.map(
                    ({ id, name, username }) => <li key={id}>{name || username}</li>,
                  )}
                </ul>
              </div>
              <div className="form-container">
                <h3>Add new member - </h3>
                <Input
                  label="Username"
                  ref={this.user}
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
};

Project.defaultProps = {};

export default withRouter(Project);
