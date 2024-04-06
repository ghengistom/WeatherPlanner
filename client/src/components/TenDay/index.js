import React, { Component, useState, useEffect, createElement } from 'react';
import './style.css';
import axios from 'axios';

function TenDay() {

  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const [weatherRecords, setWeatherRecords] = useState([]);
  const [periodRecords, setPeriodRecords] = useState([]);
  const [gpsX, setGpsX] = useState(null);
  const [gpsY, setGpsY] = useState(null);
  const [tenDayApi, setTenDayApi] = useState(null);
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
  function showPosition(position) {
    const gpsX = position.coords.latitude.toFixed(4);
    const gpsY = position.coords.longitude.toFixed(4);
    setGpsX(gpsX); 
    setGpsY(gpsY);
    getEndPoints(gpsX, gpsY);
  }
  const makePage = (array) => {
    array.forEach((element, index, array) => {
      var div = document.createElement('div');
      div.setAttribute('id', index);
      div.setAttribute('class', 'card boxBorder')
      div.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${element.name }</h5>
                <p class="card-text">${element.detailedForecast}</p>
                <p class="card-text">Temperature: ${element.temperature} ${element.temperatureUnit}</p>
                <p class="card-text">Wind direction: ${element.windDirection}</p>
                <p class="card-text">Wind speed: ${element.windSpeed}</p>
            </div>
      `;
      document.getElementById('div1').appendChild(div);
    });
  };
  const getEndPoints = (x,y)=>{
    // Update the document title using the browser API    
    // axios.get('https://api.weather.gov/gridpoints/SGX/60,52/forecast')
    axios.get(`https://api.weather.gov/points/${x},${y}`)
    .then(response => {
      console.log('getEndPoints response.data.properties.forecast', response.data.properties.forecast);
      setTenDayApi(response.data.properties.forecast)
      return true;
    })
    .catch(error => {
      console.error(error);
    });
  }

  const getTenDay = (endpoint)=>{
    // Update the document title using the browser API    
    // axios.get('https://api.weather.gov/gridpoints/SGX/60,52/forecast')
    axios.get(endpoint)
    .then(response => {
      const periodRecords = [...response.data.properties.periods]
      setPeriodRecords(periodRecords);
      setWeatherRecords(response.data.properties);
      setPosts(response.data.properties.periods[0].detailedForecast);
      console.log('periodRecords', periodRecords);
      console.log('response.data.properties', response.data.properties);
      console.log('response.data.properties.periods[0].detailedForecast', response.data.properties.periods[0].detailedForecast);
      console.log('response.data.properties', response.data.properties);
      return true;
    })
    .catch(error => {
      console.error(error);
    });
  }
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    getLocation();
      console.log('tenDayApi', tenDayApi)
      if(tenDayApi){
        getTenDay(tenDayApi);
      }
    
    console.log('gpsX and gpsY' + gpsX + gpsY)

  },[posts, tenDayApi]);

  if(posts){
    makePage(periodRecords);
    // makePage(weatherRecords);
  }  

  return (
    <div id="myDIV"> 
<h1>10 Day Forecast for {todayDate}</h1>
<hr></hr>
      {/* <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button> */}
      <div id="div1">
      </div>
    </div>
  

  );
}

export default TenDay;