import { 
    GET_TASKS, 
    ADD_TASK, 
    DELETE_TASK, 
    UPDATE_TASK_PRIORITY, 
    TASKS_ERROR 
  } from './types';
  
  export const getTasks = () => dispatch => {
    try {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      
      dispatch({
        type: GET_TASKS,
        payload: tasks
      });
    } catch (err) {
      dispatch({
        type: TASKS_ERROR,
        payload: 'Error retrieving tasks'
      });
    }
  };
  
  export const addTask = (task) => dispatch => {
    try {
      const newTask = {
        ...task,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      
      dispatch({
        type: ADD_TASK,
        payload: newTask
      });
    } catch (err) {
      dispatch({
        type: TASKS_ERROR,
        payload: 'Error adding task'
      });
    }
  };
  
  export const deleteTask = (id) => dispatch => {
    try {
      dispatch({
        type: DELETE_TASK,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: TASKS_ERROR,
        payload: 'Error deleting task'
      });
    }
  };
  
  export const updateTaskPriority = (id, priority) => dispatch => {
    try {
      dispatch({
        type: UPDATE_TASK_PRIORITY,
        payload: { id, priority }
      });
    } catch (err) {
      dispatch({
        type: TASKS_ERROR,
        payload: 'Error updating task priority'
      });
    }
  };