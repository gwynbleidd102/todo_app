import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import propTypes from 'prop-types';

export default class Task extends Component {
  static defaultProps = {
    onDeleted: () => {},
    onToggleCompleted: () => {},
    onTaskEdit: () => {},
    startTimer: () => {},
    pauseTimer: () => {},
  };

  static propTypes = {
    onDeleted: propTypes.func,
    onToggleCompleted: propTypes.func,
    onTaskEdit: propTypes.func,
    startTimer: propTypes.func,
    pauseTimer: propTypes.func,
  };

  state = {
    editing: false,
    newDescription: this.props.description,
  };

  editTask = (elem) => {
    if (elem.key === 'Enter') {
      this.props.onTaskEdit(elem.target.value);
      this.setState({ editing: false });
    }
  };

  editToggle = () => {
    this.setState({ editing: true });
  };

  render() {
    const { task, onDeleted, onToggleCompleted, startTimer, pauseTimer, minutes, seconds } = this.props;
    const { description, created, completed } = task;
    const { newDescription, editing } = this.state;

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
          <button className="icon icon-edit" onClick={this.editToggle}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <input
          type="text"
          className="edit"
          value={newDescription}
          onChange={(elem) => {
            this.setState({ newDescription: elem.target.value });
          }}
          onKeyDown={this.editTask}
        ></input>
      </li>
    );
  }
}
