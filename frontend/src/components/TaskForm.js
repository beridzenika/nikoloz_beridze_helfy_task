import { useState, useEffect } from 'react';

function TaskForm({ onSubmit, editingTask }) {
  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: 'medium'
  });
  
  useEffect(() => {
    if (editingTask) {
      setTask({
        title: editingTask.title,
        description: editingTask.description,
        priority: editingTask.priority
      });
    } else {
      setTask({
        title: '',
        description: '',
        priority: 'medium'
      });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTask((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (!task.title.trim()) return;
    onSubmit(task);

    setTask({
      title: '',
      description: '',
      priority: 'medium'
    });
  };

  
  
  return (
    <div className="task-form">
      <h2>{editingTask ? 'Edit Task' : 'New Task'}</h2>
      <form onSubmit={handleForm}>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
        />
        <textarea
          placeholder="Description"
          name="description"
          value={task.description}
          onChange={handleChange}
        />
        <select name="priority" value={task.priority} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">{editingTask ? 'Save' : 'Add Task'}</button>
      </form>
    </div>
  );
}

export default TaskForm;