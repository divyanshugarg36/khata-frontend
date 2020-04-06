import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import AddMember from './addMember';
import { API } from '../../api';
import { getEntity } from '../../utils';

class MemberList extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    
    this.state = {
      members: [],
      history: props.history,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    getEntity(API.user.all, {}, ({ users: members }) => this._isMounted
      && this.setState({ members }));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  updateList = (member) => {
    const { members } = this.state;
    members[members.length] = member;
    this.setState({ members });
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
