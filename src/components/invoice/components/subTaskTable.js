import React, { useState } from 'react';
import { getRandom } from '../../../utils';

const SubTaskTable = (props) => {
  const { tasks: data, onSave } = props;
  const tasks = data && data.length ? data : [{ title: '', hours: 0 }];
  const [rows, setRows] = useState(tasks);

  const updateRow = (event, row, col) => {
    const { value } = event.target;
    const newRows = [...rows];
    newRows[row][col] = value;
    setRows(newRows);
  };

  const removeRow = (rowNo) => {
    const newRows = [...rows];
    newRows.splice(rowNo, 1);
    setRows(newRows);
  };

  const addRow = () => {
    setRows([...rows, { title: '', hours: 0 }]);
  };

  return (
    <div className="edit-mode-table">
      <table border="1">
        <thead>
          <tr>
            <th>Title</th>
            <th>Hours</th>
            <th><button onClick={addRow}>Add row</button></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={getRandom()}>
              {['title', 'hours'].map((col) => (
                <td key={col}>
                  <input
                    onBlur={(e) => updateRow(e, i, col)}
                    type={col === 'title' ? 'text' : 'number'}
                    defaultValue={r[col]}
                  />
                </td>
              ))}
              <td><button onClick={() => removeRow(i)}>x</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => onSave(rows)}>Save Tasks</button>
    </div>
  );
};

export default SubTaskTable;
