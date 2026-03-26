function TaskItem({task}) {
  return (
    <article className="Task-item">
        <div className="task-header">
            <span
            className="priority"
            >
            {task.priority}
            </span>
            <h3>{task.title}</h3>
        </div>
        <p className="text">{task.description}</p>
        <p className="date">Created: {new Date(task.createdAt).toLocaleDateString()}</p>

        <div className="task-actions">
            <input
            type="checkbox"
            checked={task.completed}
            // onChange={() => onToggle(task.id, !task.completed)}
            />
            <button onClick={() => console.log('onEdit(task)')}>Edit</button>
            <button onClick={() => console.log('onDelete(task.id)')}>Delete</button>
        </div>
    </article>
  )
};

export default TaskItem;