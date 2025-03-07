// src/redux/actions/authActions.js
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SIGNUP_SUCCESS, SIGNUP_FAIL } from './types';

// Simulated login - in a real app, this would call an API
export const login = (credentials) => dispatch => {
  try {
    // Mock authentication - in a real app, validate against backend
    if (credentials.email === 'user@example.com' && credentials.password === 'password') {
      const user = {
        id: 1,
        name: 'Demo User',
        email: credentials.email
      };
      
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user
      });
      
      return true;
    } else {
      dispatch({
        type: LOGIN_FAIL,
        payload: 'Invalid credentials'
      });
      
      return false;
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.message
    });
    
    return false;
  }
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};

export const signup = (userData) => async dispatch => {
  try {
    // Simulated signup - in a real app, this would call an API
    const user = {
      id: Date.now(),
      name: userData.name,
      email: userData.email
    };
    
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: user
    });
    
    return true;
  } catch (err) {
    dispatch({
      type: SIGNUP_FAIL,
      payload: 'Signup failed'
    });
    
    return false;
  }
};