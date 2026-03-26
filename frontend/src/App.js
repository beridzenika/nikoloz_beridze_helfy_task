import './styles/App.css';

import { useEffect, useState } from 'react';
import { getTasks } from './services/api';

import TaskFilter from './components/TaskFilter';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);

  //get
  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    };
    fetchTasks();
  });

  
  return (
    <div className="App">
      <h1>Task Manager</h1>

      <TaskFilter />
      <TaskList tasks={tasks}/>

      <h2>Add New Tasks</h2>
      {/* <TaskForm></TaskForm> */}
    </div>
  );
}

export default App;
