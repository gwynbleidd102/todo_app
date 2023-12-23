import React from 'react';
import propTypes from 'prop-types';

const TasksFilter = ({ onChangeFilter }) => {
  const handleFilterChange = (filter) => {
    onChangeFilter(filter);
  };

  return (
    <ul className="filters">
      <li>
        <button onClick={() => handleFilterChange('all')}>All</button>
      </li>
      <li>
        <button onClick={() => handleFilterChange('active')}>Active</button>
      </li>
      <li>
        <button onClick={() => handleFilterChange('completed')}>Completed</button>
      </li>
    </ul>
  );
};

TasksFilter.defaulProps = {
  filter: () => {},
};

TasksFilter.propTypes = {
  filter: propTypes.func,
};

export default TasksFilter;
