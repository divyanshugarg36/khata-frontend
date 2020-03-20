import React from 'react';
import PropTypes from 'prop-types';

const TextArea = React.forwardRef((props, ref) => {
  const {
    label,
    id,
    value,
  } = props;
  const newId = !id ? Math.random().toString(36).substring(2) : id;
  return (
    <div className="textarea-container">
      <label htmlFor={newId}>{label}</label>
      <br />
      <textarea
        ref={ref}
        id={newId}
        defaultValue={value}
      />
    </div>
  );
});

TextArea.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
};

TextArea.defaultProps = {
  id: '',
  value: '',
};

export default TextArea;
