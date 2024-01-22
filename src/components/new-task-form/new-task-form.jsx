import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  static defaultProps = {
    createTask: () => {},
  };

  static propTypes = {
    createTask: PropTypes.func,
  };

  state = {
    taskDescription: '',
    minutes: '',
    seconds: '',
  };

  onInputChange = (elem) => {
    this.setState({ taskDescription: elem.target.value });
  };

  onMinutesChange = (elem) => {
    this.setState({ minutes: elem.target.value });
  };

  onSecondsChange = (elem) => {
    this.setState({ seconds: elem.target.value });
  };

  formSubmitHandler = (event) => {
    event.preventDefault();

    const { taskDescription, minutes, seconds } = this.state;

    if (taskDescription.trim().length !== 0) {
      this.props.createTask(taskDescription, minutes, seconds);
      this.setState({ taskDescription: '', minutes: '', seconds: '' });
    }
  };

  render() {
    return (
      <header className="header">
        <h1>Todo List</h1>
        <form className="new-todo-form" onSubmit={this.formSubmitHandler}>
          <input
            className="new-todo"
            placeholder="Task"
            value={this.state.taskDescription}
            onChange={this.onInputChange}
            required
            autoFocus
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            value={this.state.minutes}
            onChange={this.onMinutesChange}
            required
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            value={this.state.seconds}
            onChange={this.onSecondsChange}
            required
          />
          <button type="submit" className="new-todo-form__button" />
        </form>
      </header>
    );
  }
}
