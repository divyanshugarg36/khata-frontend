import React from 'react';
import PropTypes from 'prop-types';

const Input = React.forwardRef((props, ref) => {
  const { label, type } = props;
  const id = props.id && label.replace(/ +/g, '').toLowerCase();
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
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  id: null,
};

export default Input;
