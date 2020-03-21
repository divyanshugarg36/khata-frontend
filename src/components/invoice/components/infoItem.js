import React from 'react';
import PropTypes from 'prop-types';

const InfoItem = ({ label, value }) => (
  <div className="row flex">
    <div className="title">
      {`${label}: `}
      &nbsp;
    </div>
    <div className="content">{value}</div>
  </div>
);

InfoItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default InfoItem;
