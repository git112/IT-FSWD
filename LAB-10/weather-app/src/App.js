import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import './styles/weather.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSearchedCity, setLastSearchedCity] = useState('');

  const API_KEY = '73c25aad1814973c7692cb704a6a011d'; // Replace with your actual API key

  const fetchWeatherData = async (cityName) => {
    if (!cityName.trim()) {
      setError('Please enter a city name');
      return;
    }
    
    setLoading(true);
    setError(null);
    setLastSearchedCity(cityName);
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName.trim()}&units=metric&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`City "${cityName}" not found. Try another location.`);
        } else if (response.status === 401) {
          throw new Error('Invalid API key. Please check your configuration.');
        } else {
          throw new Error('Failed to fetch weather data. Please try again later.');
        }
      }
      
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchCity) => {
    setCity(searchCity);
    fetchWeatherData(searchCity);
  };

  return (
    <div className="weather-app">
      <div className="weather-container">
        <h1 className="app-title">Weather Forecast</h1>
        
        <SearchBar 
          onSearch={handleSearch} 
          loading={loading}
          initialCity={city}
        />
        
        {error && (
          <div className="error-container">
            <p className="error-message">{error}</p>
            {lastSearchedCity && (
              <p className="suggestion">
                Did you mean: 
                <button 
                  className="suggestion-button"
                  onClick={() => fetchWeatherData(lastSearchedCity)}
                >
                  Try again
                </button>
              </p>
            )}
          </div>
        )}
        
        {weatherData && <WeatherCard data={weatherData} />}
        
        {!weatherData && !error && !loading && (
          <div className="welcome-message">
            <h2>Welcome to Weather App</h2>
            <p>Search for a city to get current weather information</p>
            <div className="example-cities">
              <p>Try these examples:</p>
              <div className="city-buttons">
                {['London', 'New York', 'Tokyo', 'Paris', 'Sydney'].map((city) => (
                  <button
                    key={city}
                    className="example-city"
                    onClick={() => handleSearch(city)}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;