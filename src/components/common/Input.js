import React from 'react';
import PropTypes from 'prop-types';

const Input = React.forwardRef((props, ref) => {
  const { label, id, type } = props;
  const newId = !id ? Math.random().toString(36).substring(2) : id;
  return (
    <div className="input-container">
      <label htmlFor={newId}>{label}</label>
      <br />
      <input
        ref={ref}
        id={newId}
        type={type}
      />
    </div>
  );
});

Input.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
};

Input.defaultProps = {
  id: '',
  type: 'text',
};

export default Input;
