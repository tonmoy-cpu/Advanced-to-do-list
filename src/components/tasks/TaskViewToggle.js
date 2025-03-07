// src/components/tasks/TaskViewToggle.js
import React from 'react';

const TaskViewToggle = ({ view, setView }) => {
  return (
    <div className="task-view-toggle">
      <button onClick={() => setView('list')} className={view === 'list' ? 'active' : ''}>
        List View
      </button>
      <button onClick={() => setView('card')} className={view === 'card' ? 'active' : ''}>
        Card View
      </button>
    </div>
  );
};

export default TaskViewToggle;