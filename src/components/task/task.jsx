import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import propTypes from 'prop-types';

const Task = ({ task, onDeleted, onToggleCompleted, onTaskEdit, startTimer, pauseTimer }) => {
  const [editing, setEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(task.description);

  const editTask = (event) => {
    if (event.key === 'Enter') {
      onTaskEdit(newDescription);
      setEditing(false);
    }
  };

  const editToggle = () => {
    setEditing(true);
  };

  const { description, created, completed, minutes, seconds } = task;

  let classNames = 'description';
  if (completed) {
    classNames += ' completed';
  }
  if (editing) {
    classNames += ' editing';
  }

  return (
    <li className={classNames}>
      <div className="view">
        <input className="toggle" type="checkbox" defaultChecked={completed} onClick={onToggleCompleted} />
        <label>
          <span className={classNames}> {description} </span>
          <span className="created">
            <button className="icon icon-play" type="button" onClick={startTimer}></button>
            <button className="icon icon-pause" type="button" onClick={pauseTimer}></button>
            <span className="timer-block">
              {minutes}:{seconds}
            </span>
          </span>
          <span className="created">created {formatDistanceToNow(new Date(created), { addSuffix: true })}</span>
        </label>
        <button className="icon icon-edit" onClick={editToggle}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
      <input
        type="text"
        className="edit"
        value={newDescription}
        onChange={(event) => {
          setNewDescription(event.target.value);
        }}
        onKeyDown={editTask}
      />
    </li>
  );
};

Task.defaultProps = {
  onDeleted: () => {},
  onToggleCompleted: () => {},
  onTaskEdit: () => {},
  startTimer: () => {},
  pauseTimer: () => {},
};

Task.propTypes = {
  onDeleted: propTypes.func,
  onToggleCompleted: propTypes.func,
  onTaskEdit: propTypes.func,
  startTimer: propTypes.func,
  pauseTimer: propTypes.func,
};

export default Task;
