import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { API } from '../api';
import messages from '../const/historyInfo';

const HistoryItem = ({ data }) => {
  const {
    member,
    message,
    name,
    date: datetime,
  } = data;
  return (
    <div>
      <strong>{member}</strong>
      {` ${messages[message]} `}
      <u>{name}</u>
      <br />
      <small>
        {`${new Date(datetime).toDateString()}, ${new Date(datetime).toLocaleTimeString('en-US')}`}
      </small>
    </div>
  );
};

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      filtered: [],
      filters: ['All', ...Object.keys(messages)],
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    axios.post(API.history.get)
      .then(({ data }) => this._isMounted
        && this.setState({ history: data.history, filtered: data.history }))
      .catch((err) => console.log(err));
  }

  componentWillUnmount() {
    this._isMounted = false;
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
              <HistoryItem data={item} />
              <br />
            </li>
          )) }
        </ul>
      </>
    );
  }
}

HistoryItem.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(History);
