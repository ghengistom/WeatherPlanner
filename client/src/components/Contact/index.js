import React, { Component, useState, useEffect } from 'react';
import './style.css';

function Contact() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
      fetchWeatherData();
  }, []);

  const fetchWeatherData = () => {
      fetch('https://api.weather.gov/points/33.5773,-117.2493')
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(data => {
              const forecastUrl = data.properties.forecast;
              return fetch(forecastUrl);
          })
          .then(response => response.json())
          .then(data => {
              setWeatherData(data);
          })
          .catch(error => {
              console.error('Error fetching weather data:', error);
          });
  };

  return (
      <div className="container mt-5">
          <h1 className="text-center mb-5">Weather Information</h1>
          {weatherData && (
              <div className="row row-cols-1 row-cols-md-2 g-4">
                  <div className="col">
                      <div className="card">
                          <div className="card-body">
                              <h5 className="card-title">Location</h5>
                              <p className="card-text">Latitude: {weatherData.geometry.coordinates[1]}</p>
                              <p className="card-text">Longitude: {weatherData.geometry.coordinates[0]}</p>
                          </div>
                      </div>
                  </div>
                  <div className="col">
                      <div className="card">
                          <div className="card-body">
                              <h5 className="card-title">Forecast</h5>
                              <p className="card-text">{weatherData.properties.periods[0].detailedForecast}</p>
                          </div>
                      </div>
                  </div>
                  <div className="col">
                      <div className="card">
                          <div className="card-body">
                              <h5 className="card-title">Temperature</h5>
                              <p className="card-text">{weatherData.properties.periods[0].temperature} {weatherData.properties.periods[0].temperatureUnit}</p>
                          </div>
                      </div>
                  </div>
                  <div className="col">
                      <div className="card">
                          <div className="card-body">
                              <h5 className="card-title">Wind</h5>
                              <p className="card-text">{weatherData.properties.periods[0].windSpeed}</p>
                          </div>
                      </div>
                  </div>
              </div>
          )}
      </div>
  );
}

export default Contact;