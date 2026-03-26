import TaskItem from './TaskItem';

function TaskList({tasks, actions}) {
  return (
    <div className='Task-list'>
        {tasks.map((task) => (
            <TaskItem 
              key={task.id} 
              task={task} 
              actions={actions}
            />
        ))}
    </div>
  )
};

export default TaskList;