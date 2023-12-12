import React, { useState } from 'react';
import axios from 'axios';
import "./App.css";


function App() {

  
  const [data, setData] = useState({})
  const [zipcode, setZipcode] = useState('')

  const url = `https://api.weatherstack.com/current?access_key=${process.env.REACT_APP_api_key}&query=${zipcode}`

  const searchZipcode = (event) => {
    event.preventDefault()
  

      axios.get(url)
      .then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setZipcode('')
    
  }


  return (
    <div className="app">
      <div className="search">
        <input
          onChange={event => setZipcode(event.target.value)}
          placeholder='Type City/Zip'
          type="text" />
      </div>
      <button className="getWeather" onClick={(event) => searchZipcode(event)} type='button'>Click for Weather</button>
      <div className="container">
        <div className="top">
          <div className="location">
            {data.location ? <p className = "location-name">{data.location.name}</p> : null}
          </div>
          <div className="temp">
          {data.current ? <h1>{Math.trunc((data.current.temperature)*1.8+32)}°F</h1> : null}
          </div>
          <div className="description">
               {data.current ? <p className = "descriptionWeather">{data.current.weather_descriptions[0]}</p> : null }
             </div>
             <div className = "logo-image">
             {data.current ? <img className= "logo" src={data.current.weather_icons[0]}/> : null}
             </div>
             <div className="bottom">
            <div className="feels">
             {data.current ? <p className="bold">{Math.trunc((data.current.feelslike)*1.8+32)}°F</p> : null}
            <p className='weatherTitles'>Feels Like</p>
            </div>
           <div className="humidity">
             {data.current ? <p className="bold">{data.current.humidity}</p>: null}
             <p className='weatherTitles'>Humidity</p> 
            </div>
           <div className="wind">
             {data.current ? <p className="bold">{data.current.wind_speed} MPH</p> : null}
             <p className='weatherTitles'>Wind Speed</p> 
            </div>
          </div>
        </div> 

     



      </div>
    </div>
  );
}

export default App;
