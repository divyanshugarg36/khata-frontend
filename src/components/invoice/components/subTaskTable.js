import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getRandom } from '../../../utils';

class SubTaskTable extends Component {
  constructor(props) {
    super(props);
    const { tasks: data, onSave } = props;
    const tasks = data && data.length ? data : [{ title: '', hours: 0 }];
    this.state = { tasks, onSave };
  }

  updateTask = (event, row, col) => {
    const { value } = event.target;
    const { tasks } = this.state;
    tasks[row][col] = value;
    this.setState(() => tasks);
  };

  removeTask = (rowNo) => {
    const { tasks } = this.state;
    tasks.splice(rowNo, 1);
    this.setState(() => tasks);
  };

  addTask = () => {
    const { tasks } = this.state;
    tasks.push({ title: '', hours: 0 });
    this.setState(() => tasks);
  };

  render() {
    const { tasks, onSave } = this.state;
    return (
      <div className="edit-mode-table">
        <table border="1">
          <thead>
            <tr>
              <th>Title</th>
              <th>Hours</th>
              <th><button onClick={this.addTask}>Add row</button></th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t, i) => (
              <tr key={getRandom()}>
                <SubTask task={t} onUpdate={this.updateTask} onRemove={this.removeTask} index={i} />
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => onSave(tasks)}>Save Tasks</button>
      </div>
    );
  }
}

const SubTask = (props) => {
  const {
    task,
    onUpdate,
    onRemove,
    index,
  } = props;
  return (
    <>
      {
        ['title', 'hours'].map((col) => (
          <td key={col}>
            <input
              onBlur={(e) => onUpdate(e, index, col)}
              type={col === 'title' ? 'text' : 'number'}
              defaultValue={task[col]}
            />
          </td>
        ))
      }
      <td><button onClick={() => onRemove(index)}>x</button></td>
    </>
  );
};

SubTaskTable.propTypes = {
  tasks: PropTypes.instanceOf(Object).isRequired,
  onSave: PropTypes.func.isRequired,
};

SubTask.propTypes = {
  task: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default SubTaskTable;
