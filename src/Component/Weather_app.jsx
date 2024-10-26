import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import Search_icon from '../asset/search.png'
import clear_icon from '../asset/clear.png'
import clouds_icon from '../asset/clouds.png'
import drizzle_icon from '../asset/drizzle.png'
import humidity_icon from '../asset/humidity.png'
import mist_icon from '../asset/mist.png'
import rain_icon from '../asset/rain.png'
import snow_icon from '../asset/snow.png'
import wind_icon from '../asset/wind.png'
function Weather_app() {
    const[weatherData,setWeatherData]=useState(false);
    const inputRef = useRef()
    const allIcon={
                 "01d": clear_icon,
                 "01n":  clear_icon,
                 "02d": clouds_icon,
                 "03d":  clouds_icon,
                 "02n": clouds_icon,
                 "03n": clouds_icon,
                 "04d":drizzle_icon,
                 "04n":drizzle_icon,
                 "09d":rain_icon,
                 "09n":rain_icon,
                 "10d":rain_icon,
                 "10n":rain_icon,
                 "13d":snow_icon,
                 "13n":snow_icon
    }
    const search = async (city)=>{
        if(city===""){
            alert("Enter city name ")
            return;
        }
        try{
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=b1b4fa2098e2694a2a3456806ea87ca3`
            const response= await fetch(url)
            const data = await response.json();
            if(!response.ok){
                alert(data.message);
                return;
            }
            console.log(data);
            const icon= allIcon[data.weather[0].icon] ||clear_icon;
            setWeatherData({
                humidity:data.main.humidity,
                windSpeed:data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon:icon
            })
        } catch{(error);
        
        }
    }
    useEffect (()=>{
            search("damoh")
    },[])
  return (
    <div >
            <div className="continer">
                    <div className='input_field'> 
                            <input type="text" ref={inputRef} className='input_box'/>
                            <img src={Search_icon} 
                            alt='sorry this image is not available' className='search_box' onClick={()=>search(inputRef.current.value)}/>
                    </div>
                        <img src={weatherData.icon} className='weather_icon' alt='sorry this image is not available'/>
                    <h5 className='tem_box'>{weatherData.temperature}°C</h5>
                    <h4 className='location'>{weatherData.location}</h4>
                    <div className='wind_data'>
                        <div className="col">
                            <img src={humidity_icon} alt='sorry this image is not available' />
                            <div>
                                <h5>{weatherData.humidity}%</h5>
                                <h5>Humidity</h5>
                            </div>
                        </div>
                        <div className="col">
                            <img src={wind_icon} alt='sorry this image is not available' />
                            <div>
                                <h5>{weatherData.windSpeed} Km/h</h5>
                                <h5>Wind Speed</h5>
                            </div>
                        </div>
                    </div>
            </div>

    </div>
  )
}

export default Weather_app
