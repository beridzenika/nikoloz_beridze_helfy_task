import './styles/App.css';

import { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask, toggleTask } from './services/api';

import TaskFilter from './components/TaskFilter';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  //post
  const handleCreate = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      setTasks(prev => [...prev, newTask]);
    } catch (err) {
      setError(err.message);
    }
  };

  //update
   const handleEdit = async (id, taskData) => {
    try {
      const updated = await updateTask(id, taskData);
      setTasks(prev => prev.map(t => t.id === id ? updated : t));
      setEditingTask(null);
    } catch (err) {
      setError(err.message);
    }
  };

  //delete
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  //toggle
  const handleToggle = async (id, completed) => {
    try {
      const updated = await toggleTask(id, completed);
      setTasks(prev => prev.map(t => t.id === id ? updated : t));
    } catch (err) {
      setError(err.message);
    }
  };

  //filter
  const filteredTasks = tasks.filter(t => {
    if (filter === 'completed') return t.completed;
    if (filter === 'pending') return !t.completed;
    return true;
  });

  return (
    <div className="App">
      <header>
        <h1>Task Manager</h1>
        <img className='logo' src='logo.png'/>
      </header>
    
      <TaskFilter activeFilter={filter} setActiveFilter={setFilter}/>

      {loading ? (
        <p>Loading...</p>
      ) : (
      <TaskList 
        tasks={filteredTasks} 
        onEdit={setEditingTask}
        onDelete={handleDelete}
        onToggle={handleToggle}
      />
      )}

      {error && <p className='error-message'>{error}</p>}

      <TaskForm 
       onSubmit={editingTask ? (data) => handleEdit(editingTask.id, data) : handleCreate}
       editingTask={editingTask}
      />
    </div>
  );
}

export default App;
