import React from "react";
import TasksFilter from '../tasks-filter';

const Footer = ({tasks}) => {

  const activeTasks = tasks.filter(task => !task.completed).length;

  return (
    <footer className="footer">
      <span className="todo-count">{activeTasks} {activeTasks === 1 ? 'item' : 'items'} left</span>
      <TasksFilter />
      <button className="clear-completed">Clear completed</button>
    </footer>  
  );
};

export default Footer;