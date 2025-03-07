// src/components/tasks/TaskItem.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTaskPriority } from '../../redux/actions/taskActions';
import './TaskItem.css';

const TaskItem = ({ task, view }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [priority, setPriority] = useState(task.priority);
  
  const dispatch = useDispatch();
  
  const onDelete = () => {
    dispatch(deleteTask(task.id));
  };
  
  const onChangePriority = e => {
    const newPriority = e.target.value;
    setPriority(newPriority);
  };
  
  const onSubmitEdit = () => {
    dispatch(updateTaskPriority(task.id, priority));
    setIsEditing(false);
  };
  
  const priorityColor = {
    high: '#ff6b6b',
    medium: '#ffcc5c',
    low: '#88d8b0'
  };

  return (
    <div className={`task-item ${view}`}>
      {view === 'list' ? (
        <div className="task-content">
          <p className="task-title">{task.title}</p>
          <span className={`priority-badge ${task.priority}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
          <button onClick={onDelete} className="btn-delete">
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      ) : (
        <div className="task-card" style={{ borderLeft: `4px solid ${priorityColor[task.priority]}` }}>
          <h3 className="task-title">{task.title}</h3>
          <p>Priority: {task.priority}</p>
          <button onClick={onDelete} className="btn-delete">
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;