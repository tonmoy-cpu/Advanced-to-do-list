import { 
    GET_TASKS, 
    ADD_TASK, 
    DELETE_TASK, 
    UPDATE_TASK_PRIORITY, 
    TASKS_ERROR 
  } from '../actions/types';
  
  const initialState = {
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    loading: false,
    error: null
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_TASKS:
        return {
          ...state,
          tasks: action.payload,
          loading: false
        };
      case ADD_TASK:
        const updatedTasks = [...state.tasks, action.payload];
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        return {
          ...state,
          tasks: updatedTasks
        };
      case DELETE_TASK:
        const filteredTasks = state.tasks.filter(task => task.id !== action.payload);
        localStorage.setItem('tasks', JSON.stringify(filteredTasks));
        return {
          ...state,
          tasks: filteredTasks
        };
      case UPDATE_TASK_PRIORITY:
        const updatedPriorityTasks = state.tasks.map(task => 
          task.id === action.payload.id 
            ? { ...task, priority: action.payload.priority } 
            : task
        );
        localStorage.setItem('tasks', JSON.stringify(updatedPriorityTasks));
        return {
          ...state,
          tasks: updatedPriorityTasks
        };
      case TASKS_ERROR:
        return {
          ...state,
          error: action.payload,
          loading: false
        };
      default:
        return state;
    }
  }