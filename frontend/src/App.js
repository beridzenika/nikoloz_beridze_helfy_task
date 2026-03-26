import './styles/App.css';

import { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask, toggleTask } from './services/api';

import TaskFilter from './components/TaskFilter';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  //get
  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    };
    fetchTasks();
  });

  //post
  const handleCreate = async (taskData) => {
    const newTask = await createTask(taskData);
    setTasks(prev => [...prev, newTask]);
  };

  //update
  const handleEdit = async (id, taskData) => {
    const editedTask = await updateTask(id, taskData);
    setTasks(prev => prev.map(t => t.id === id? editedTask : t));
    setEditingTask(null);
  }

  //delete
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task for real?')) return;
    await deleteTask(id);
    setTasks(prev => prev.filter(t => t.id !== id));
  }
  
  //toggle
  const handleToggle = async (id) => {
    const edited = await toggleTask(id);
    if (edited) {
      setTasks(prev => prev.map(t => t.id === id ? edited : t));
    }
  }

  return (
    <div className="App">
      <h1>Task Manager</h1>

      <TaskFilter />
      <TaskList 
        tasks={tasks} 
        actions={{ setEditingTask, handleDelete, handleToggle }}
      />

      <TaskForm 
       onSubmit={editingTask ? (data) => handleEdit(editingTask.id, data) : handleCreate}
       editingTask={editingTask}
      />
    </div>
  );
}

export default App;
