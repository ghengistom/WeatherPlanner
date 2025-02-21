import React, { Component, useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';


function Contact() {
  const [weatherData, setWeatherData] = useState(null);

  const [gpsX, setGpsX] = useState(null);
  const [gpsY, setGpsY] = useState(null);
//   const [tenDayApi, setTenDayApi] = useState(null);
  const [todayDate, setTodayDate] = useState(null);

  function getLocation() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;



    setTodayDate(today);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      return true;
    } else {
       alert("Geolocation is not supported by this browser.");
       return false;
    }
  }
//   const get10DayForecast = (x,y)=>{
//     // Update the document title using the browser API    
//     // axios.get('https://api.weather.gov/gridpoints/SGX/60,52/forecast')
//     axios.get(`https://api.weather.gov/points/${x},${y}`)
//     .then(response => {
//       console.log('get10DayForecast response.data.properties.forecast', response.data.properties.forecast);
//       setTenDayApi(response.data.properties.forecast)
//       return true;
//     })
//     .catch(error => {
//       console.error(error);
//     });
//   }
  function showPosition(position) {
    const gpsX = position.coords.latitude.toFixed(4);
    const gpsY = position.coords.longitude.toFixed(4);
    setGpsX(gpsX); 
    setGpsY(gpsY);

    //fetch the weather data
    fetch(`https://api.weather.gov/points/${gpsX},${gpsY}`)
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
        console.log('setWeatherData data', data)
        setWeatherData(data);
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });





    //get10DayForecast(gpsX, gpsY);
  }




  useEffect(() => {
      getLocation();
      //fetchWeatherData(gpsX, gpsY);
  }, []);

//   const fetchWeatherData = (gpsX, gpsY) => {
//       fetch(`https://api.weather.gov/points/${gpsX},${gpsY}`)
//           .then(response => {
//               if (!response.ok) {
//                   throw new Error('Network response was not ok');
//               }
//               return response.json();
//           })
//           .then(data => {
//               const forecastUrl = data.properties.forecast;
//               return fetch(forecastUrl);
//           })
//           .then(response => response.json())
//           .then(data => {
//               setWeatherData(data);
//           })
//           .catch(error => {
//               console.error('Error fetching weather data:', error);
//           });
//   };

  return (
      <div className="container mt-5">
          <h1 className="text-center mb-5">Weather Information</h1>
          {weatherData && (
              <div className="row row-cols-1 row-cols-md-2 g-4">
                  <div className="col">
                      <div className="card">
                          <div className="card-body">
                              <h5 className="card-title">Location</h5>
                              <p className="card-text">Latitude: {weatherData.geometry.coordinates[0][0][0]}</p>
                              <p className="card-text">Longitude: {weatherData.geometry.coordinates[0][0][1]}</p>
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