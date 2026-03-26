import TaskItem from './TaskItem';

function TaskList({tasks}) {
  return (
    <div className='Task-list'>
        {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
        ))}
    </div>
  )
};

export default TaskList;