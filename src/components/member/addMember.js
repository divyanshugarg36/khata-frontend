import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Input from '../common/Input';
import { API } from '../../api';

class AddMember extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.username = React.createRef();
    this.name = React.createRef();
    this.email = React.createRef();
    this.togglUid = React.createRef();
  }

  addMember = () => {
    const {
      username: { current: { value: username } },
      name: { current: { value: name } },
      email: { current: { value: email } },
      togglUid: { current: { value: togglUid } },
    } = this;
    const data = {
      username,
      name,
      email,
      toggl: {
        uid: togglUid,
      },
    };
    axios.post(API.addMember, data)
      .then(({ data }) => {
        window.alert('Member added!');
        const { onAdd } = this.props;
        onAdd(data.user);
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
          <Input
            label="Toggl UID"
            type="number"
            ref={this.togglUid}
          />
          <button onClick={addMember}>Add member</button>
        </div>
      </>
    );
  }
}

AddMember.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

AddMember.defaultProps = {};

export default withRouter(AddMember);
