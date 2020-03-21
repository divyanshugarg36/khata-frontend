import React, { Component } from 'react';
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
                {['title', 'hours'].map((col) => (
                  <td key={col}>
                    <input
                      onBlur={(e) => this.updateTask(e, i, col)}
                      type={col === 'title' ? 'text' : 'number'}
                      defaultValue={t[col]}
                    />
                  </td>
                ))}
                <td><button onClick={() => this.removeTask(i)}>x</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => onSave(tasks)}>Save Tasks</button>
      </div>
    );
  }
}

export default SubTaskTable;
