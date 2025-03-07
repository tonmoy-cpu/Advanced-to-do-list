import { 
    GET_WEATHER, 
    WEATHER_ERROR 
  } from '../actions/types';
  
  const initialState = {
    weather: null,
    loading: true,
    error: null
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_WEATHER:
        return {
          ...state,
          weather: action.payload,
          loading: false
        };
      case WEATHER_ERROR:
        return {
          ...state,
          error: action.payload,
          loading: false
        };
      default:
        return state;
    }
  }