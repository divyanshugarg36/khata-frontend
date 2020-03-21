import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Input from '../common/Input';

class MemberForm extends Component {
  onSubmitHandler = () => {
    const {
      username: { value: username },
      name: { value: name },
      email: { value: email },
      togglUid: { value: togglUid },
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
        <Input label="Name" ref={(el) => { this.name = el; }} value={name || ''} />
        <Input label="Username" ref={(el) => { this.username = el; }} value={username || ''} />
        <Input label="Email" ref={(el) => { this.email = el; }} type="email" value={email || ''} />
        <Input label="Toggl UID" type="number" ref={(el) => { this.togglUid = el; }} value={toggl ? toggl.uid : ''} />
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
