import React from 'react';
import PropTypes from 'prop-types';

const Input = React.forwardRef((props, ref) => {
  const { label, id, type } = props;
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <input
        ref={ref}
        id={id}
        type={type}
      />
    </div>
  );
});

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
};

export default Input;
