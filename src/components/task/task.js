import React from "react";
import { formatDistanceToNow } from "date-fns";

const Task = ({task}) => {
  const {description, created, completed} = task;

  return (
    <li className={completed ? 'completed' : ''}>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>
          <span className="description">{description}</span>
          <span className="created">
            created {formatDistanceToNow(new Date(created), {addSuffix: true})}
          </span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
      </div>
    </li>
  );
};

export default Task;