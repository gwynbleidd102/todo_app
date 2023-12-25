import React, { Component } from 'react';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

export default class App extends Component {
  id = 0;

  state = {
    tasks: [
      this.addTask('Drink Coffee'),
      this.addTask('Make awesome app'),
      this.addTask('go out'),
      this.addTask('become happy'),
    ],
    currentFilter: 'all',
  };

  addTask(description) {
    return {
      id: this.id++,
      description,
      created: new Date(),
      completed: false,
      isVisible: true,
    };
  }

  createTask = (text) => {
    const newTask = this.addTask(text);

    this.setState(({ tasks, currentFilter }) => {
      const newArray = [...tasks, newTask];

      const filteredArray = newArray.map((task) => {
        let isVisible = true;

        if (currentFilter === 'active') {
          isVisible = !task.completed;
        }
        if (currentFilter === 'completed') {
          isVisible = task.completed;
        }

        return { ...task, isVisible: isVisible };
      });

      return {
        tasks: filteredArray,
      };
    });
  };

  deleteTask = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((elem) => elem.id === id);

      const newArray = [...tasks.slice(0, idx), ...tasks.slice(idx + 1)];

      return {
        tasks: newArray,
      };
    });
  };

  onClearCompleted = () => {
    this.setState(({ tasks }) => {
      return {
        tasks: [...tasks.filter((elem) => elem.completed === false)],
      };
    });
  };

  onToggleCompleted = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((elem) => elem.id === id);

      const oldTask = tasks[idx];
      const newTask = {
        ...oldTask,
        completed: !oldTask.completed,
      };

      const newArray = [...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)];

      return {
        tasks: newArray,
      };
    });
  };

  changeFilter = (filter) => {
    this.setState({ currentFilter: filter });

    this.setState(({ tasks }) => {
      const filteredArray = tasks.map((task) => {
        let isVisible = true;

        if (filter === 'active') {
          isVisible = !task.completed;
        }
        if (filter === 'completed') {
          isVisible = task.completed;
        }

        return { ...task, isVisible: isVisible };
      });

      return {
        tasks: filteredArray,
      };
    });
  };

  onTaskEdit = (id, newDescription) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((elem) => elem.id === id);
      const editedTask = { ...tasks[idx], description: newDescription };

      const editedArray = [...tasks.slice(0, idx), editedTask, ...tasks.slice(idx + 1)];

      return {
        tasks: editedArray,
      };
    });
  };

  render() {
    const { tasks, currentFilter: filter } = this.state;

    return (
      <section className="todoapp">
        <NewTaskForm createTask={this.createTask} />
        <section className="main">
          <TaskList
            tasks={tasks}
            onDeleted={this.deleteTask}
            onToggleCompleted={this.onToggleCompleted}
            onTaskEdit={this.onTaskEdit}
            filter={filter}
          />
          <Footer
            counter={tasks.filter((elem) => !elem.completed).length}
            onChangeFilter={this.changeFilter}
            onClearCompleted={this.onClearCompleted}
          />
        </section>
      </section>
    );
  }
}
