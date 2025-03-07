import { combineReducers } from 'redux';
import taskReducer from './taskReducer';
import weatherReducer from './weatherReducer';
import authReducer from './authReducer';

export default combineReducers({
  tasks: taskReducer,
  weather: weatherReducer,
  auth: authReducer
});
