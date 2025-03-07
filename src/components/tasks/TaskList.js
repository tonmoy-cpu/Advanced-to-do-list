// src/components/tasks/TaskList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../../redux/actions/taskActions';
import TaskInput from './TaskInput';
import TaskItem from './TaskItem';
import WeatherWidget from '../weather/WeatherWidget';
import TaskViewToggle from './TaskViewToggle';
import './TaskList.css';

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, error } = useSelector(state => state.tasks);
  const { user } = useSelector(state => state.auth);
  const [view, setView] = useState('list');

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const completedTasks = tasks.filter(task => task.completed);
  const incompleteTasks = tasks.filter(task => !task.completed);

  return (
    <div className="task-list-container">
      <div className="welcome-section">
        <h2>Welcome, {user?.name || ' User '}</h2>
        <p>Manage your tasks efficiently</p>
      </div>

      <TaskViewToggle view={view} setView={setView} />

      <div className="content-section">
        <div className="left-panel">
          <TaskInput />
          <WeatherWidget location={user?.location} />
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
                <>
                  <h3>Incomplete Tasks</h3>
                  {incompleteTasks .length === 0 ? (
                    <p>No incomplete tasks.</p>
                  ) : (
                    incompleteTasks.map(task => (
                      <TaskItem key={task.id} task={task} view={view} />
                    ))
                  )}

                  <h3>Completed Tasks</h3>
                  {completedTasks.length === 0 ? (
                    <p>No completed tasks.</p>
                  ) : (
                    completedTasks.map(task => (
                      <TaskItem key={task.id} task={task} view={view} />
                    ))
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;