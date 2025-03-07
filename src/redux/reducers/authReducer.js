import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../actions/types';

const initialState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  user: JSON.parse(localStorage.getItem('user')) || null,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case LOGOUT:
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
}