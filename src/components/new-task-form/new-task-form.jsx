import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ createTask }) => {
  const [taskDescription, setTaskDescription] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const onInputChange = (event) => {
    setTaskDescription(event.target.value);
  };

  const onMinutesChange = (event) => {
    setMinutes(event.target.value);
  };

  const onSecondsChange = (event) => {
    setSeconds(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (taskDescription.trim().length !== 0) {
      createTask(taskDescription, minutes, seconds);
      setTaskDescription('');
      setMinutes('');
      setSeconds('');
    }
  };

  return (
    <header className="header">
      <h1>Todo List</h1>
      <form className="new-todo-form" onSubmit={formSubmitHandler}>
        <input
          className="new-todo"
          placeholder="Task"
          value={taskDescription}
          onChange={onInputChange}
          required
          autoFocus
        />
        <input className="new-todo-form__timer" placeholder="Min" value={minutes} onChange={onMinutesChange} required />
        <input className="new-todo-form__timer" placeholder="Sec" value={seconds} onChange={onSecondsChange} required />
        <button type="submit" className="new-todo-form__button" />
      </form>
    </header>
  );
};

NewTaskForm.propTypes = {
  createTask: PropTypes.func,
};

export default NewTaskForm;
