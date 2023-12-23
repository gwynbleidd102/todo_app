import React from 'react'
import propTypes from 'prop-types'

import Task from '../task';

const TaskList = ({ tasks, onDeleted, onToggleCompleted, onTaskEdit }) => {
  return (
    <ul className="todo-list">
      {tasks.map((task) => {
        const { id, description, completed, isVisible } = task;
        if (!isVisible) return null;
        return (
          <Task
            key={id}
            task={task}
            description={description}
            completed={completed}
            onDeleted={() => onDeleted(id)}
            onToggleCompleted={() => onToggleCompleted(id)}
            onTaskEdit={(description) => onTaskEdit(id, description)}
          />
        );
      })}
    </ul>
  );
};

TaskList.defaultProps = {
  tasks: [],
  onDeleted: () => {},
  onToggleCompleted: () => {},
  onTaskEdit: () => {},
}

TaskList.propTypes = {
  tasks: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number,
      description: propTypes.string,
      completed: propTypes.bool,
      isVisible: propTypes.bool,
    })
  ),
  onDeleted: propTypes.func,
  onToggleCompleted: propTypes.func,
  onTaskEdit: propTypes.func,
}

export default TaskList;
