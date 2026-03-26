import { useRef, useState, useCallback, useMemo } from 'react';
import TaskItem from './TaskItem';
import '../styles/TaskList.css';

function TaskList({ tasks,  onEdit, onDelete, onToggle  }) {
  const CARD_WIDTH = 320;

  const trackRef = useRef(null);
  const isMoving = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const tripled = useMemo(
    () => [
      ...tasks.map((t, i) => ({ ...t, _key: `a-${i}` })),
      ...tasks.map((t, i) => ({ ...t, _key: `b-${i}` })),
      ...tasks.map((t, i) => ({ ...t, _key: `c-${i}` })),
    ],
    [tasks]
  );

  const offset = (tasks.length + currentIndex) * CARD_WIDTH;

  const handleTransitionEnd = useCallback(() => {
    isMoving.current = false;
  }, []);

  const go = useCallback((direction) => {
    if (isMoving.current) return;
    isMoving.current = true;

    setCurrentIndex(prev => {
      const next = prev + direction;
      if (next >= tasks.length) return 0;
      if (next < 0) return tasks.length - 1;
      return next;
    });
  }, [tasks.length]);

  if (tasks.length === 0) {
    return (
      <div className="carousel-empty">
        <p>No tasks here. Add one bellow.</p>
      </div>
    );
  }
  else if (tasks.length === 1) {
    return (
      <div className="carousel-single">
        <TaskItem task={tasks[0]} 
                onEdit={onEdit}
                onDelete={onDelete}
                onToggle={onToggle} />
      </div>
    );
  }

  return (
    <div className="carousel-wrapper">
      <button className="carousel-btn" onClick={() => go(-1)} aria-label="Previous"> <img src='/arrow.png' className='arrow'/> </button>

      <div className="carousel-window">
        <div
          className="carousel-track"
          ref={trackRef}
          style={{ transform: `translateX(-${offset}px)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {tripled.map((task, index) => {
            const realIndex = index % tasks.length;
            const realTask = tasks[realIndex];

            return (
              <div className="carousel-card" key={task._key}>
                <TaskItem
                  task={realTask}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onToggle={onToggle}
                />
              </div>
            );
          })}
        </div>
      </div>

      <button className="carousel-btn" onClick={() => go(1)} aria-label="Next"> <img src='/arrow.png' className='arrow right'/></button>
    </div>
  );
}

export default TaskList