import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Input from '../common/Input';

class MemberForm extends Component {
  constructor(props) {
    super(props);

    this.username = React.createRef();
    this.name = React.createRef();
    this.email = React.createRef();
    this.togglUid = React.createRef();
  }

  onSubmitHandler = () => {
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
    const { onSubmit } = this.props;
    onSubmit(data);
  }

  render() {
    const { onSubmitHandler } = this;
    const { submitLabel, data } = this.props;
    const {
      name,
      username,
      email,
      toggl,
    } = data;
    return (
      <div className="form-container">
        <Input label="Name" ref={this.name} value={name || ''} />
        <Input label="Username" ref={this.username} value={username || ''} />
        <Input label="Email" ref={this.email} type="email" value={email || ''} />
        <Input label="Toggl UID" type="number" ref={this.togglUid} value={toggl ? toggl.uid : ''} />
        <button onClick={onSubmitHandler}>{submitLabel}</button>
      </div>
    );
  }
}

MemberForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string,
  data: PropTypes.instanceOf(Object),
};

MemberForm.defaultProps = {
  submitLabel: 'Submit',
  data: {},
};

export default withRouter(MemberForm);
