import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWeather } from '../../redux/actions/weatherActions';
import './WeatherWidget.css';

const WeatherWidget = () => {
  const [location, setLocation] = useState('New York');
  const [searchLocation, setSearchLocation] = useState('');
  
  const dispatch = useDispatch();
  const { weather, loading, error } = useSelector(state => state.weather);
  
  useEffect(() => {
    dispatch(getWeather(location));
  }, [dispatch, location]);
  
  const handleSearch = e => {
    e.preventDefault();
    if (searchLocation.trim()) {
      setLocation(searchLocation);
      setSearchLocation('');
    }
  };
  
  // Weather icon mapping
  const getWeatherIcon = (weatherCode) => {
    const icons = {
      '01': 'fas fa-sun', // clear sky
      '02': 'fas fa-cloud-sun', // few clouds
      '03': 'fas fa-cloud', // scattered clouds
      '04': 'fas fa-cloud', // broken clouds
      '09': 'fas fa-cloud-showers-heavy', // shower rain
      '10': 'fas fa-cloud-rain', // rain
      '11': 'fas fa-bolt', // thunderstorm
      '13': 'fas fa-snowflake', // snow
      '50': 'fas fa-smog' // mist
    };
    
    if (!weatherCode) return 'fas fa-question';
    
    const prefix = weatherCode.slice(0, 2);
    return icons[prefix] || 'fas fa-cloud';
  };
  
  if (loading) {
    return (
      <div className="weather-widget">
        <h3>Weather Information</h3>
        <div className="loading">Loading weather data...</div>
      </div>
    );
  }
  
  return (
    <div className="weather-widget">
      <h3>Weather Information</h3>
      
      <form onSubmit={handleSearch} className="weather-search">
        <input
          type="text"
          value={searchLocation}
          onChange={e => setSearchLocation(e.target.value)}
          placeholder="Enter location..."
        />
        <button type="submit">Search</button>
      </form>
      
      {error ? (
        <div className="weather-error">
          {error}. Please try another location.
        </div>
      ) : weather ? (
        <div className="weather-info">
          <div className="weather-location">
            <h4>{weather.name}, {weather.sys.country}</h4>
          </div>
          
          <div className="weather-main">
            <div className="weather-icon">
              <i className={getWeatherIcon(weather.weather[0]?.icon)}></i>
            </div>
            <div className="weather-temp">
              {Math.round(weather.main.temp)}°C
            </div>
          </div>
          
          <div className="weather-description">
            {weather.weather[0]?.description}
          </div>
          
          <div className="weather-details">
            <div className="weather-detail">
              <span className="label">Humidity:</span> 
              <span className="value">{weather.main.humidity}%</span>
            </div>
            <div className="weather-detail">
              <span className="label">Wind:</span> 
              <span className="value">{Math.round(weather.wind.speed * 3.6)} km/h</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="weather-placeholder">
          No weather data available
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;