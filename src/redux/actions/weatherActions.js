import { GET_WEATHER, WEATHER_ERROR } from './types';
import axios from 'axios';


export const getWeather = (location = 'New York') => async dispatch => {
  try {
    // Using OpenWeatherMap API - you'll need to get an API key
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
    );
    
    dispatch({
      type: GET_WEATHER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: WEATHER_ERROR,
      payload: err.response?.data?.message || 'Error fetching weather data'
    });
  }
};