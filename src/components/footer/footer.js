import React from 'react'
import propTypes from 'prop-types'

import TasksFilter from '../tasks-filter'

const Footer = ({ counter, onChangeFilter, onClearCompleted }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{counter} items left</span>
      <TasksFilter onChangeFilter={onChangeFilter} />
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  counter: 0,
  onChangeFilter: () => {},
  onClearCompleted: () => {},
}

Footer.propTypes = {
  counter: propTypes.number,
  onChangeFilter: propTypes.func,
  onClearCompleted: propTypes.func,
}

export default Footer;
