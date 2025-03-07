// src/components/tasks/TaskInput.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../redux/actions/taskActions';
import './TaskInput.css';

const TaskInput = () => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [location, setLocation] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [reminder, setReminder] = useState('');
  const [repeat, setRepeat] = useState('none');

  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();

    if (!title.trim()) return;

    const newTask = {
      title,
      priority ,
      location: location.trim() || null,
      dueDate: dueDate || null,
      reminder: reminder || null,
      repeat: repeat || null,
      completed: false,
    };

    dispatch(addTask(newTask));

    // Reset form
    setTitle('');
    setPriority('medium');
    setLocation('');
    setDueDate('');
    setReminder('');
    setRepeat('none');
  };

  return (
    <div className="task-input-container">
      <h2>Add New Task</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Task Description</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={e => setPriority(e.target.value)}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location (for weather info - optional)</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="e.g., New York"
          />
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="reminder">Reminder</label>
          <input
            type="datetime-local"
            id="reminder"
            value={reminder}
            onChange={e => setReminder(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="repeat">Repeat</label>
          <select
            id="repeat"
            value={repeat}
            onChange={e => setRepeat(e.target.value)}
          >
            <option value="none">None</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <button type="submit" className="btn-add">Add Task</button>
      </form>
    </div>
  );
};

export default TaskInput;