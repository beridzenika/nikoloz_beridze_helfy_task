function TaskItem({ task, onEdit, onDelete, onToggle }) {
  return (
    <article className="Task-item">
      <span className={`priority ${task.priority}`}>
      {task.priority} priority
      </span>
        <div className="task-header">
            <h3>{task.title}</h3>
        </div>
        <p className="text">{task.description}</p>
        <p className="date">Created: {new Date(task.createdAt).toLocaleDateString()}</p>

        <div className="task-actions">
            <input
            className="checkbox"
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            />
            <button onClick={() => onEdit(task)}>Edit</button>
            <button onClick={() => onDelete(task.id)}>Delete</button>
        </div>
    </article>
  )
};

export default TaskItem;