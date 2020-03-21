import React from 'react';
import PropTypes from 'prop-types';

const SubTaskList = ({ item, column }) => {
  if (item.tasks && item.tasks.length) {
    return (
      <ul>
        {item.tasks.map((t, i) => <li key={i}>{t[column]}</li>)}
      </ul>
    );
  }
  return null;
};

SubTaskList.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
  column: PropTypes.string.isRequired,
};

export default SubTaskList;
