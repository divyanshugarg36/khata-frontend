import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Input from './common/Input';
import { API } from '../api';

class AddMember extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.username = React.createRef();
    this.name = React.createRef();
    this.email = React.createRef();
  }

  addMember = () => {
    const {
      username: { current: { value: username } },
      name: { current: { value: name } },
      email: { current: { value: email } },
    } = this;
    const data = {
      username,
      name,
      email,
      isMember: true,
    };
    axios.post(API.addMember, data)
      .then(() => {
        window.alert('Member added!');
      })
      .catch((err) => window.alert(err.response.data.info || 'Member not added!'));
  }

  render() {
    const { addMember } = this;
    return (
      <>
        <div className="form-container">
          <h3>Add new member - </h3>
          <Input
            label="Username"
            ref={this.username}
          />
          <Input
            label="Name"
            ref={this.name}
          />
          <Input
            label="Email"
            ref={this.email}
            type="email"
          />
          <button onClick={addMember}>Add member</button>
        </div>
      </>
    );
  }
}

export default withRouter(AddMember);
