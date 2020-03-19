import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import AddMember from './addMember';
import { API } from '../../api';
import { getEntity } from '../../utils';

class MemberList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      history: props.history,
    };
  }

  componentDidMount() {
    getEntity(API.user.all, {}, ({ users: members }) => this.setState({ members }));
  }

  updateList = (member) => {
    if (member) {
      const { members } = this.state;
      this.setState({ members: members.push(member) });
    }
  }

  render() {
    const { members, history: { push } } = this.state;
    return (
      <>
        <AddMember onAdd={this.updateList} />
        <h4>List of Members</h4>
        <ul className="list-container">
          { members.map((p) => {
            const {
              id,
              name,
              username,
              email,
            } = p;
            return (
              <li key={id}>
                <strong onClick={() => { push(`/member/${id}`); }}>{username}</strong>
                {` (${name})`}
                <p>{email}</p>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

MemberList.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

MemberList.defaultProps = {};

export default withRouter(MemberList);
