import React from "react";

import Task from '../task'

const TaskList = ({tasks}) => {
  return (
    <ul className="todo-list">
      {tasks.map(task => (
        <Task key={task.id} task={task} />
      ))}
    </ul>
  );
};

export default TaskList;