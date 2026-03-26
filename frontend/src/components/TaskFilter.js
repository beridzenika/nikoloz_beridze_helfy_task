function TaskFilter({ activeFilter, setActiveFilter }) {
  const filters = ['all', 'completed', 'pending'];

  return (
    <div className="task-filter">
      {filters.map(filter => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={activeFilter === filter ? 'active' : ''}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default TaskFilter;