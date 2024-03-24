import React from 'react'

const WeatherBox = ({weather,date,korea,icon}) => {
  console.log("weather",weather)
  console.log(icon)
  return (
    <div className='weather-box'>
      <div className='flex-box'>
     <div className='title'>{date}</div>
      <div className='title'>{weather?.name}</div>
      </div>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`}/>
      <div className='flex-box'>
      <h3>{weather?.weather[0].description}</h3>
      <h2>{weather?.main.temp}</h2>
      </div>
    </div>
  )
}

export default WeatherBox

