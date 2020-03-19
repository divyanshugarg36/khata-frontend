import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { API } from '../api';
import messages from '../const/historyInfo';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      filtered: [],
      filters: ['All', ...Object.keys(messages)],
    };
  }

  componentDidMount() {
    axios.post(API.history.get)
      .then(({ data }) => {
        this.setState({ history: data.history, filtered: data.history });
      })
      .catch((err) => console.log(err));
  }

  filter = (message) => {
    const { history } = this.state;
    let filtered = history.filter((item) => item.message === message);
    if (message === 'All') {
      filtered = history;
    }
    this.setState({ filtered });
  }

  render() {
    const { filtered, filters } = this.state;
    return (
      <>
        <h4>History</h4>
        {filters.map((m) => (
          <button key={m} onClick={() => this.filter(m)} style={{ textTransform: 'capitalize' }}>
            {m.replace('_', ' ').toLowerCase()}
          </button>
        ))}
        <ul>
          { filtered.map((item, key) => (
            <li key={key}>
              <strong>{item.member}</strong>
              {` ${messages[item.message]} `}
              <u>{item.name}</u>
              <br />
              <small>
                {`${new Date(item.date).toDateString()}, ${new Date(item.date).toLocaleTimeString('en-US')}`}
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
