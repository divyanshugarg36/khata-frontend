import React from 'react';
import PropTypes from 'prop-types';

const Select = React.forwardRef((props, ref) => {
  const { label, options } = props;
  const id = props.id && label.replace(/ +/g, '').toLowerCase();
  return (
    <div className="select-container">
      <label htmlFor={id}>{label}</label>
      <select id={id} ref={ref}>
        { options.map((opt, key) => <option key={key}>{opt}</option>) }
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
  id: null,
};

export default Select;
