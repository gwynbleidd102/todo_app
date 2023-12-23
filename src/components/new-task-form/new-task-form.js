import React, { Component } from 'react'
import propTypes from 'prop-types';

export default class NewTaskForm extends Component {
  static defaultProps = {
    createTask: () => {},
  }

  static propTypes = {
    createTask: propTypes.func,
  }

  state = {
    taskDescription: '',
  }

  inputChange = (elem) => {
    this.setState({ taskDescription: elem.target.value })
  }

  inputPressHandler = (elem) => {
    if (elem.key === 'Enter' && this.state.taskDescription.trim().length !== 0) {
      this.props.createTask(this.state.taskDescription);
      this.setState({ taskDescription: '' })
    }
  }

  render() {
    return (
      <header className="header">
        <h1>Todo List</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.taskDescription}
          onChange={this.inputChange}
          onKeyDown={this.inputPressHandler}
          autoFocus
        />
      </header>
    );
  }
}
