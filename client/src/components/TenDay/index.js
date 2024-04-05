import React, { Component, useState, useEffect, createElement } from 'react';
import './style.css';
import axios from 'axios';

function TenDay() {

  // const x = document.getElementById("div1");

  // function getLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(showPosition);
  //   } else {
  //     x.innerHTML = "Geolocation is not supported by this browser.";
  //   }
  // }
  
  // function showPosition(position) {
  //   x.innerHTML = "Latitude: " + position.coords.latitude +
  //   "<br>Longitude: " + position.coords.longitude;
  // }



  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const [weatherRecords, setWeatherRecords] = useState([]);
  const [periodRecords, setPeriodRecords] = useState([]);

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
      // console.log(element.name); // 100, 200, 300
      // console.log(index); // 0, 1, 2
      // console.log(array); // same myArray object 3 times
    });
  };
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API    
    axios.get('https://api.weather.gov/gridpoints/SGX/60,52/forecast')
    .then(response => {
      const periodRecords = [...response.data.properties.periods]
      setPeriodRecords(periodRecords);
      setWeatherRecords(response.data.properties);
      setPosts(response.data.properties.periods[0].detailedForecast);
 
      console.log('periodRecords', periodRecords);

      console.log('response.data.properties', response.data.properties);
      console.log('response.data.properties.periods[0].detailedForecast', response.data.properties.periods[0].detailedForecast);
      console.log('response.data.properties', response.data.properties);

    })
    .catch(error => {
      console.error(error);
    });

  },[posts]);

  if(posts){
    makePage(periodRecords);
    // makePage(weatherRecords);

  }  

  return (
    <div id="myDIV"> 
    <h1>10 Day Forecast</h1>
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