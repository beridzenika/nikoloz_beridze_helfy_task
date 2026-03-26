function TaskItem({ task, actions}) {
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
            onChange={() => actions.handleToggle(task.id)}
            />
            <button onClick={() => actions.setEditingTask(task)}>Edit</button>
            <button onClick={() => actions.handleDelete(task.id)}>Delete</button>
        </div>
    </article>
  )
};

export default TaskItem;