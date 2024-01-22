import React from 'react';
import propTypes from 'prop-types';

import Task from '../task';

const TaskList = ({ tasks, onDeleted, onToggleCompleted, onTaskEdit, startTimer, pauseTimer }) => {
  return (
    <ul className="todo-list">
      {tasks.map((task) => {
        const { id, description, completed, isVisible, minutes, seconds } = task;
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
            minutes={minutes}
            seconds={seconds}
            startTimer={() => startTimer(id)}
            pauseTimer={() => pauseTimer()}
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
  startTimer: () => {},
  pauseTimer: () => {},
};

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
  startTimer: propTypes.func,
  pauseTimer: propTypes.func,
};

export default TaskList;
