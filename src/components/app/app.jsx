import React, { useState, useEffect, useCallback, useRef } from 'react';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [timerId, setTimerId] = useState(null);

  const idRef = useRef(0);

  useEffect(() => {
    return () => {
      clearInterval(timerId);
    };
  }, [timerId]);

  const addTask = useCallback((description, minutes, seconds) => {
    return {
      id: idRef.current++,
      description,
      created: new Date(),
      completed: false,
      isVisible: true,
      minutes,
      seconds,
    };
  }, []);

  const createTask = useCallback(
    (text, minutes, seconds) => {
      const newTask = addTask(text, minutes, seconds);

      setTasks((prevTasks) => {
        const newArray = [...prevTasks, newTask];

        const filteredArray = newArray.map((task) => {
          let isVisible = true;

          if (currentFilter === 'active') {
            isVisible = !task.completed;
          }
          if (currentFilter === 'completed') {
            isVisible = task.completed;
          }

          return { ...task, isVisible };
        });

        return filteredArray;
      });
    },
    [addTask, currentFilter]
  );

  const startTimer = useCallback(
    (id) => {
      if (!isTimerOn) {
        setIsTimerOn(true);
        setTimerId(
          setInterval(() => {
            setTasks((prevTasks) => {
              const idx = prevTasks.findIndex((elem) => elem.id === id);
              if (idx === -1) {
                clearInterval(timerId);
                setIsTimerOn(false);
                return prevTasks;
              }
              const oldItem = prevTasks[idx];
              let newItem = { ...oldItem, seconds: oldItem.seconds - 1 };
              if (newItem.seconds < 0) {
                newItem = { ...newItem, minutes: oldItem.minutes - 1, seconds: 59 };
              }
              if (newItem.seconds === 0 && newItem.minutes === 0) {
                clearInterval(timerId);
                setIsTimerOn(false);
                return prevTasks;
              }
              const newData = [...prevTasks.slice(0, idx), newItem, ...prevTasks.slice(idx + 1)];
              return newData;
            });
          }, 1000)
        );
      }
    },
    [isTimerOn, timerId]
  );

  const pauseTimer = useCallback(() => {
    clearInterval(timerId);
    setIsTimerOn(false);
  }, [timerId]);

  const deleteTask = useCallback((id) => {
    setTasks((prevTasks) => {
      const idx = prevTasks.findIndex((elem) => elem.id === id);

      const newArray = [...prevTasks.slice(0, idx), ...prevTasks.slice(idx + 1)];

      return newArray;
    });
  }, []);

  const onClearCompleted = useCallback(() => {
    setTasks((prevTasks) => {
      return prevTasks.filter((elem) => !elem.completed);
    });
  }, []);

  const onToggleCompleted = useCallback((id) => {
    setTasks((prevTasks) => {
      const idx = prevTasks.findIndex((elem) => elem.id === id);

      const oldTask = prevTasks[idx];
      const newTask = {
        ...oldTask,
        completed: !oldTask.completed,
      };

      const newArray = [...prevTasks.slice(0, idx), newTask, ...prevTasks.slice(idx + 1)];

      return newArray;
    });
  }, []);

  const changeFilter = useCallback((filter) => {
    setCurrentFilter(filter);

    setTasks((prevTasks) => {
      const filteredArray = prevTasks.map((task) => {
        let isVisible = true;

        if (filter === 'active') {
          isVisible = !task.completed;
        }
        if (filter === 'completed') {
          isVisible = task.completed;
        }

        return { ...task, isVisible };
      });

      return filteredArray;
    });
  }, []);

  const onTaskEdit = useCallback((id, newDescription) => {
    setTasks((prevTasks) => {
      const idx = prevTasks.findIndex((elem) => elem.id === id);
      const editedTask = { ...prevTasks[idx], description: newDescription };

      const editedArray = [...prevTasks.slice(0, idx), editedTask, ...prevTasks.slice(idx + 1)];

      return editedArray;
    });
  }, []);

  return (
    <section className="todoapp">
      <NewTaskForm createTask={createTask} />
      <section className="main">
        <TaskList
          tasks={tasks}
          onDeleted={deleteTask}
          onToggleCompleted={onToggleCompleted}
          onTaskEdit={onTaskEdit}
          filter={currentFilter}
          startTimer={(id) => startTimer(id)}
          pauseTimer={() => pauseTimer()}
        />
        <Footer
          counter={tasks.filter((elem) => !elem.completed).length}
          onChangeFilter={changeFilter}
          onClearCompleted={onClearCompleted}
        />
      </section>
    </section>
  );
};

export default App;
