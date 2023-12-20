import React, { Component } from "react";
import { formatDistanceToNow } from "date-fns";
import propTypes from 'prop-types';


export default class Task extends Component {

  static defaultProps = {
    onDeleted: () => {},
    onToggleCompleted: () => {},
    onTaskEdit: () => {},
  }

  static propTypes = {
    onDeleted: propTypes.func,
    onToggleCompleted: propTypes.func,
    onTaskEdit: propTypes.func,
  }


  state = {
    editing: false,
    newDescription: this.props.description ,
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
    const { task, onDeleted, onToggleCompleted, onTaskEdit } = this.props;
    const { description, created, completed } = task;
    const { newDescription, editing } = this.state;
 
    let classNames = 'description';
    if (completed) {
      classNames += ' completed';
    }
    if (editing) {
      classNames += ' editing'
    }

    return (
      <li className={ completed ? 'completed' : '' }>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            defaultChecked={ completed }
            onClick={ onToggleCompleted }
          />
          <label>
            <span className={ classNames } > {description} </span>
            <span className="created">
              created {formatDistanceToNow(new Date(created), { addSuffix: true })}
            </span>
          </label>
          <button className="icon icon-edit"
                // onClick={ (this.editToggle) }
                onClick={ () => onTaskEdit() } ></button>
          <button className="icon icon-destroy" 
                onClick={ onDeleted }></button>
        </div>
        <input
          type="text"
          className="edit"
          value={ newDescription }
          onInput={(elem) => {
            this.setState({ newDescription: elem.target.value });
          }}
          // onKeyDown={(e) => this.editTask(e)}
          onKeyDown={this.editTask}
        ></input>
      </li>
    );
  }

};

