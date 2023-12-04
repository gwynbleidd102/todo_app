import React, { useState } from "react";

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

function App () {

  const [tasks, setTasks] = useState([
    {id: 1, descriprion: 'Completed task', created: new Date(), completed: true},
  ]);

  return (
    <div className="app">
      <NewTaskForm />
      <section className="main">
        <TaskList tasks={tasks} />
        <Footer tasks={tasks} />
      </section>
    </div>
  );
}

export default App;
