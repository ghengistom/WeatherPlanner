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
  const [iP, setIP] = useState(null);
  let first = 0;
  let second = 0;

  //Get user ip address
  const getIpAddress = async () => {

      const res = await axios.get("https://api.ipify.org/?format=json")
      .then(response => {
        console.log(response.data);
        setIP(response.data.ip);
        return true;
      }).catch(error => {
        console.error(error);
      });
  };


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
    get10DayForecast(gpsX, gpsY);

    

  }

  const get10DayForecast = (x,y)=>{
    // Update the document title using the browser API    
    // axios.get('https://api.weather.gov/gridpoints/SGX/60,52/forecast')
    axios.get(`https://api.weather.gov/points/${x},${y}`)
    .then(response => {
      console.log('get10DayForecast response.data.properties.forecast', response.data.properties.forecast);
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

  const makePage = (array) => {
  
    for(let i = 0; i < array.length; i++)
    {
      console.log('makePage array[i]', array[i]);
      console.log('makePage array', array);
      var div = document.createElement('div'); 
      // div.className = "card shadow-sm card-margin-1";
      div.className = "card shadow-sm mb-3 card-padding";
      // div.className = "card border border-success p-2 mb-2";
      div.style = "width: 18 rem";
      div.id = `${i}.card`
      div.innerHTML = `
            <div className="card-body card-margin-1">
              <h2 className="card-title" id="${i}flush-headingOne">
                ${array[i].name }
              </h2>
              <p className="card-text">${array[i].detailedForecast}</p>

            </div>
            <ul className="list-group list-group-flush">
              <div className="widget-49">
                  <li id="${i}tmp" className="list-group-item">Temperature: ${array[i].temperature} ${array[i].temperatureUnit}</p>
                  <li id="${i}wd" className="list-group-item">Wind direction: ${array[i].windDirection}</p>
                  <li id="${i}ws" className="list-group-item">Wind direction: ${array[i].windSpeed}</p>
                
              </div>

            
            </div>
      `;
      document.getElementById('div1').appendChild(div);
  
    }
  };
  



  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    getIpAddress();
    getLocation();
    console.log('tenDayApi', tenDayApi)
    if(tenDayApi){
      getTenDay(tenDayApi);
    }

    
    console.log('gpsX and gpsY' + gpsX + gpsY);
    // fetch('http://localhost:5000/user')
    // .then(response => response.json())
    // .then(data => setMessage(data.message));
    if(second === 0 && iP !== null){
      handlePostRequest();
      second++;
    }

  },[posts, tenDayApi]);

   const handlePostRequest = async () => {
    console.log('inside handlePostRequest ');

    const response = await fetch('/api/user', {
      method: 'POST',
      mode:'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body : JSON.stringify({
        id: 1,
        ipaddress: iP,
        gpsx: gpsX,
        gpsy: gpsY,
      }),
    })
    .then(response => {
      if (!response.ok) {
        console.log('response', response);
        throw new Error(`HTTP error! status: ${response}`);
      }
      console.log(JSON.stringify(response));
      return response.json();
    })
    .then(responseData => {
      console.log('Success:', responseData);
    })
    .catch(error => {
      console.error('Error:', error);
      console.log(error);

    })

    
  };


  useEffect(() => {
    //if(posts && first === 0){
      makePage(periodRecords);
      first++;
      // makePage(weatherRecords);
    //}  
  },[]);



  return (
    <div class="container-xxl my-md-4 bd-layout" id="myDIV"> 
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