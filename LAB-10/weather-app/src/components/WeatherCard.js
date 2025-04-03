import React from 'react';
import WeatherIcon from './WeatherIcon';
import { WiHumidity, WiStrongWind } from 'react-icons/wi';
import { FiMapPin } from 'react-icons/fi';

const WeatherCard = ({ data }) => {
  const { name, main, weather, wind, sys } = data;
  const weatherCondition = weather[0].main.toLowerCase();

  const getBackgroundClass = () => {
    switch (weatherCondition) {
      case 'clear':
        return 'clear';
      case 'clouds':
        return 'cloudy';
      case 'rain':
      case 'drizzle':
        return 'rainy';
      case 'thunderstorm':
        return 'stormy';
      case 'snow':
        return 'snowy';
      default:
        return 'default';
    }
  };

  return (
    <div className={`weather-card ${getBackgroundClass()}`}>
      <div className="weather-header">
        <div className="location">
          <FiMapPin className="location-icon" />
          <h2>
            {name}, {sys.country}
          </h2>
        </div>
        <p className="weather-description">{weather[0].description}</p>
      </div>
      
      <div className="weather-main">
        <div className="temperature-section">
          <WeatherIcon condition={weatherCondition} />
          <div className="temperature">
            {Math.round(main.temp)}°C
          </div>
        </div>
        
        <div className="weather-details">
          <div className="detail-item">
            <WiHumidity className="detail-icon" />
            <span>Humidity: {main.humidity}%</span>
          </div>
          <div className="detail-item">
            <WiStrongWind className="detail-icon" />
            <span>Wind: {wind.speed} m/s</span>
          </div>
          <div className="detail-item">
            <span>Feels like: {Math.round(main.feels_like)}°C</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;