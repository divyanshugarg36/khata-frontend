import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { API } from '../api';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: [],
    };
  }

  componentDidMount() {
    axios.post(API.fetchProjects, {})
      .then(({ data }) => {
        console.log(data);
        const assignments = [];
        Object.values(data.projects).forEach((p) => {
          if (p.isAdmin) {
            assignments.push({
              date: new Date(p.createdAt),
              name: p.name,
              user: p.admin.name || p.admin.username,
              message: 'created a project',
            });
          }
          p.assignments.forEach((a) => {
            assignments.push({
              date: new Date(a.createdAt),
              name: p.name,
              user: a.name || a.username,
              message: 'added to the project',
            });
            if (!a.active) {
              assignments.push({
                date: new Date(a.unassignedAt),
                name: p.name,
                user: a.name || a.username,
                message: 'removed from the project',
              });
            }
          });
        });
        assignments.sort((a, b) => a.date - b.date);
        this.setState({ assignments });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { assignments } = this.state;
    return (
      <>
        <h4>History</h4>
        <ul>
          { assignments.map((a, key) => (
            <li key={key}>
              <strong>{a.user}</strong>
              {` ${a.message} `}
              <u>{a.name}</u>
              <br />
              <small>
                {`${a.date.toDateString()}, ${a.date.toLocaleTimeString('en-US')}`}
              </small>
              <br />
              <br />
            </li>
          )) }
        </ul>
      </>
    );
  }
}

export default withRouter(History);
