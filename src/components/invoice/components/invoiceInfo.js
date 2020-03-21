import React from 'react';
import PropTypes from 'prop-types';
import InfoItem from './infoItem';

const InvoiceInfo = ({ invoice: i }) => (
  <div>
    <InfoItem label="Invoice" value={i.invoiceNumber} />
    <InfoItem label="Attention" value={`${i.project.client} (${i.project.name})`} />
    <InfoItem label="Date" value={`${i.start} - ${i.end}`} />
    <InfoItem label="Project Title" value={i.project.name} />
    <InfoItem label="Description" value={i.description} />
  </div>
);

InvoiceInfo.propTypes = {
  invoice: PropTypes.instanceOf(Object).isRequired,
};

export default InvoiceInfo;
