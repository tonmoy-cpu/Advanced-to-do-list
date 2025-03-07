import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTaskPriority } from '../../redux/actions/taskActions';
import './TaskItem.css';

const TaskItem = ({ task }) => {
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
    <div className="task-item" style={{ borderLeft: `4px solid ${priorityColor[task.priority]}` }}>
      <div className="task-content">
        <p className="task-title">{task.title}</p>
        {task.location && (
          <span className="task-location">
            <i className="fas fa-map-marker-alt"></i> {task.location}
          </span>
        )}
      </div>
      
      {isEditing ? (
        <div className="edit-actions">
          <select value={priority} onChange={onChangePriority}>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button onClick={onSubmitEdit} className="btn-save">Save</button>
          <button onClick={() => setIsEditing(false)} className="btn-cancel">Cancel</button>
        </div>
      ) : (
        <div className="task-actions">
          <span className={`priority-badge ${task.priority}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
          <button onClick={() => setIsEditing(true)} className="btn-edit">
            <i className="fas fa-edit"></i>
          </button>
          <button onClick={onDelete} className="btn-delete">
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;