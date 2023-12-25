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
  };

  inputChange = (elem) => {
    this.setState({ taskDescription: elem.target.value });
  };

  formSubmitHandler = (event) => {
    event.preventDefault();

    const { taskDescription } = this.state;

    if (taskDescription.trim().length !== 0) {
      this.props.createTask(taskDescription);
      this.setState({ taskDescription: '' });
    }
  };

  render() {
    return (
      <header className="header">
        <h1>Todo List</h1>
        <form onSubmit={this.formSubmitHandler}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.taskDescription}
            onChange={this.inputChange}
            autoFocus
          />
        </form>
      </header>
    );
  }
}
