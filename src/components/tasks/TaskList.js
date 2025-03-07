import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../../redux/actions/taskActions';
import TaskInput from './TaskInput';
import TaskItem from './TaskItem';
import WeatherWidget from '../weather/WeatherWidget';
import './TaskList.css';

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, error } = useSelector(state => state.tasks);
  const { user } = useSelector(state => state.auth);
  
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);
  
  // Group tasks by priority
  const highPriorityTasks = tasks.filter(task => task.priority === 'high');
  const mediumPriorityTasks = tasks.filter(task => task.priority === 'medium');
  const lowPriorityTasks = tasks.filter(task => task.priority === 'low');
  
  return (
    <div className="task-list-container">
      <div className="welcome-section">
        <h2>Welcome, {user?.name || 'User'}</h2>
        <p>Manage your tasks efficiently</p>
      </div>
      
      <div className="content-section">
        <div className="left-panel">
          <TaskInput />
          <WeatherWidget />
        </div>
        
        <div className="right-panel">
          {error ? (
            <div className="error-message">{error}</div>
          ) : (
            <div className="tasks-display">
              <h2>Your Tasks</h2>
              
              {tasks.length === 0 ? (
                <p className="no-tasks-message">No tasks yet. Add one now!</p>
              ) : (
                <div className="tasks-by-priority">
                  {highPriorityTasks.length > 0 && (
                    <div className="priority-group high-priority">
                      <h3>High Priority</h3>
                      {highPriorityTasks.map(task => (
                        <TaskItem key={task.id} task={task} />
                      ))}
                    </div>
                  )}
                  
                  {mediumPriorityTasks.length > 0 && (
                    <div className="priority-group medium-priority">
                      <h3>Medium Priority</h3>
                      {mediumPriorityTasks.map(task => (
                        <TaskItem key={task.id} task={task} />
                      ))}
                    </div>
                  )}
                  
                  {lowPriorityTasks.length > 0 && (
                    <div className="priority-group low-priority">
                      <h3>Low Priority</h3>
                      {lowPriorityTasks.map(task => (
                        <TaskItem key={task.id} task={task} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
