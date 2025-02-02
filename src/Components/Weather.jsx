import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

const Weather = () => {

        const [weatherdata, setWeatherData] =useState(false)

        const inputref = useRef()

        const allicons ={
            '01d':clear_icon,
            '01n':clear_icon,
            '02d':clear_icon,
            '02n':clear_icon,
            '03d':clear_icon,
            '03n':clear_icon,
            '04d':drizzle_icon,
            '04n':drizzle_icon,
            '09d':rain_icon,
            '09n':rain_icon,
            '010d':rain_icon,
            '010n':rain_icon,
            '013d':snow_icon,
            '013n':snow_icon,
        }

        const search = async (city) => {

            if(city=== ""){
                alert("Enter City Name")
                return
            }
            try{
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
                
                const response = await fetch(url);
                const data = await response.json();
                    if(!response.ok){
                        alert("data.message")
                        return
                    }
                
                const icon = allicons[data.weather[0].icon]||clear_icon;
              setWeatherData({
                humidity:data.main.humidity,
                windspeed:data.wind.speed,
                temperature:Math.floor(data.main.temp),
                location:data.name,
                icon:icon
              })
            }catch(err){

                setWeatherData(false);
                console.err("Error in Fetching Weather Data")
            }
        }

        useEffect(()=>{
            search('ooty')
        },[])


  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputref} type="text" placeholder='Search' />
        <img src={search_icon} alt="search"  onClick={()=>search(inputref.current.value)}/>
      </div>
      {weatherdata?<>
        <img src={weatherdata.icon} alt="clear" className='weather-icon' />
      <p className='temperature'>{weatherdata.temperature}</p>
      <p className='location'>{weatherdata.location}</p>
      <div className="weather-data">
        <div className="col">
            <img src={humidity_icon} alt="humidity" />
            <div>
                <p>{weatherdata.humidity}</p>
                <span>Humidity</span>
            </div>
        </div>
        <div className="col">
            <img src={wind_icon} alt="humidity" />
            <div>
                <p>{weatherdata.windspeed}</p>
                <span>Wind Speed</span>
            </div>
        </div>
    </div>
      </>:<></>}
     </div>
  )
}

export default Weather
