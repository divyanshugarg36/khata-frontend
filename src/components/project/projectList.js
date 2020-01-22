import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { API } from '../../api';

class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: [],
    };
  }

  componentDidMount() {
    axios.post(API.fetchProjects, {})
      .then(({ data }) => this.setState({ assignments: data.assignment }))
      .catch((err) => console.log(err));
  }

  render() {
    const { assignments } = this.state;
    const { history: { push } } = this.props;
    return (
      <>
        <h4>List of projects</h4>
        <ul className="list-container">
          { assignments.map((a) => {
            const {
              description,
              id,
              name,
            } = a.project;
            return (
              <li key={id}>
                <strong onClick={() => { push(`/project/${id}`); }}>{name}</strong>
                <p>{description}</p>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

export default withRouter(ProjectList);
