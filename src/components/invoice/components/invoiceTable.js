import React from 'react';
import PropTypes from 'prop-types';
import SubTaskList from './subTaskList';

const InvoiceTable = ({ invoice, onCellEdit, onEditSubTasks }) => (
  <table role="grid" className="employee-data">
    <thead>
      <tr>{['Item', 'Total Hours', 'Unit Price', 'Cost'].map((h) => <th key={h}>{h}</th>)}</tr>
    </thead>
    <tbody>
      { invoice.items.map((item, i) => item !== null && (
        <tr key={i}>
          <td role="gridcell" onClick={(e) => { onCellEdit(e, i, 0); }}>
            <span>{item.name}</span>
            <EditSubTaskBtn item={item} onClick={onEditSubTasks} index={i} />
            <SubTaskList item={item} column="title" />
          </td>
          <td role="gridcell" onClick={(e) => { onCellEdit(e, i, 1); }}>
            <span>{item.hours}</span>
            <SubTaskList item={item} column="hours" />
          </td>
          <td>{item.price}</td>
          <td>{item.cost}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const EditSubTaskBtn = ({ item, onClick, index }) => (
  <>
    {item.type === 'Hourly' && (
      <button style={{ float: 'right' }} onClick={() => onClick(index)}>
        Edit Sub-tasks
      </button>
    )}
  </>
);

InvoiceTable.propTypes = {
  invoice: PropTypes.instanceOf(Object).isRequired,
  onCellEdit: PropTypes.func.isRequired,
  onEditSubTasks: PropTypes.func.isRequired,
};

EditSubTaskBtn.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default InvoiceTable;
