import React from 'react';
import { 
  WiDaySunny, 
  WiCloudy, 
  WiRain, 
  WiSnow, 
  WiThunderstorm,
  WiDayCloudy,
  WiFog
} from 'react-icons/wi';

const WeatherIcon = ({ condition }) => {
  const iconSize = 80;
  
  switch (condition) {
    case 'clear':
      return <WiDaySunny size={iconSize} className="weather-icon" />;
    case 'clouds':
      return <WiCloudy size={iconSize} className="weather-icon" />;
    case 'rain':
    case 'drizzle':
      return <WiRain size={iconSize} className="weather-icon" />;
    case 'snow':
      return <WiSnow size={iconSize} className="weather-icon" />;
    case 'thunderstorm':
      return <WiThunderstorm size={iconSize} className="weather-icon" />;
    case 'mist':
    case 'smoke':
    case 'haze':
    case 'fog':
      return <WiFog size={iconSize} className="weather-icon" />;
    default:
      return <WiDayCloudy size={iconSize} className="weather-icon" />;
  }
};

export default WeatherIcon;