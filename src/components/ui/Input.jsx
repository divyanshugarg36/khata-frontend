import React from 'react';

const Input = React.forwardRef((props, ref) => {
  const {
    label,
    id,
    type,
  } = props;
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <input ref={ref} id={id} type={type} />
    </div>
  );
});

export default Input;
