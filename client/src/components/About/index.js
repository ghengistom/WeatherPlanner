import React, { Component, useState, useEffect, createElement } from 'react';
import './style.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';



function About() {
  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const [weatherRecords, setWeatherRecords] = useState([]);
  const [periodRecords, setPeriodRecords] = useState([]);

  const makePage = (array) => {
    let html = '';
    let htmlFc = '';
    array.forEach((element, index, array) => {
      var div = document.createElement('div');
      div.setAttribute('id', index);
      div.setAttribute('class', 'card boxBorder')
      div.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${element.name }</h5>
                <p class="card-text">${element.shortForecast}</p>
            </div>
      `;
      document.getElementById('div1').appendChild(div);
      console.log(element.name); // 100, 200, 300
      console.log(index); // 0, 1, 2
      console.log(array); // same myArray object 3 times
    });

  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
    
    axios.get('https://api.weather.gov/gridpoints/SGX/60,52/forecast')
    .then(response => {
      const periodRecords = [...response.data.properties.periods]
      setPeriodRecords(periodRecords);
      setWeatherRecords(response.data.properties);
      setPosts(response.data.properties.periods[0].detailedForecast);
 
      console.log('periodRecords', periodRecords);

      console.log('response.data.properties', response.data.properties);
      console.log('response.data.properties.periods[0].detailedForecast', response.data.properties.periods[0].detailedForecast);
      console.log('response.data.properties.BaselineForecastGenerator', response.data.properties.BaselineForecastGenerator.periods[0]);

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
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      {/* <p>{posts}</p> */}

      {/* {(weatherRecords) ? makePage(weatherRecords): ''} */}
      <span id="test"></span>

      <div id="div1">

      </div>

      
    </div>
  

  );
}

export default About;