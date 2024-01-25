import React, { Component } from 'react';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.id = 0;
    this.timerId = null;

    this.state = {
      tasks: [],
      currentFilter: 'all',
      isTimerOn: false,
    };

    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  addTask(description, minutes, seconds) {
    return {
      id: this.id++,
      description,
      created: new Date(),
      completed: false,
      isVisible: true,
      minutes,
      seconds,
    };
  }

  createTask = (text, minutes, seconds) => {
    const newTask = this.addTask(text, minutes, seconds);

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

  startTimer(id) {
    if (!this.state.isTimerOn) {
      this.setState({ isTimerOn: true });
      this.timerId = setInterval(() => {
        this.setState((prevState) => {
          const tasksCopy = prevState.tasks.map((task) => ({ ...task }));
          const idx = tasksCopy.findIndex((elem) => elem.id === id);

          if (idx === -1 || (tasksCopy[idx].minutes === 0 && tasksCopy[idx].seconds === 0)) {
            clearInterval(this.timerId);
            return { tasks: tasksCopy, isTimerOn: false };
          }

          tasksCopy[idx].seconds--;

          if (tasksCopy[idx].seconds < 0) {
            tasksCopy[idx].minutes--;

            if (tasksCopy[idx].minutes < 0) {
              tasksCopy[idx].minutes = 0;
              tasksCopy[idx].seconds = 0;
            } else {
              tasksCopy[idx].seconds = 59;
            }
          }

          return { tasks: tasksCopy };
        });
      }, 1000);
    }
  }

  pauseTimer() {
    clearInterval(this.timerId);
    this.setState({ isTimerOn: false });
  }

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
            startTimer={(id) => this.startTimer(id)}
            pauseTimer={() => this.pauseTimer()}
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
