import React from 'react';
import PropTypes from 'prop-types';

const Select = React.forwardRef((props, ref) => {
  const { label, id, options } = props;
  const newId = !id ? Math.random().toString(36).substring(2) : id;
  return (
    <div className="select-container">
      <label htmlFor={newId}>{label}</label>
      <select id={newId} ref={ref}>
        { options.map((opt, key) => <option key={key} value={opt}>{opt}</option>) }
      </select>
    </div>
  );
});

Select.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Select.defaultProps = {
  id: '',
};

export default Select;
