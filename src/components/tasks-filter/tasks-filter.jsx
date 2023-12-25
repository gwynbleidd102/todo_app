import React, { useState } from 'react';
import propTypes from 'prop-types';

const TasksFilter = ({ onChangeFilter }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    onChangeFilter(filter);
  };

  return (
    <ul className="filters">
      <li>
        <button onClick={() => handleFilterChange('all')} className={selectedFilter === 'all' ? 'selected' : ''}>
          All
        </button>
      </li>
      <li>
        <button onClick={() => handleFilterChange('active')} className={selectedFilter === 'active' ? 'selected' : ''}>
          Active
        </button>
      </li>
      <li>
        <button
          onClick={() => handleFilterChange('completed')}
          className={selectedFilter === 'completed' ? 'selected' : ''}
        >
          Completed
        </button>
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
