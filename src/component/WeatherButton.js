import React, { useState } from 'react'
import { Button } from 'react-bootstrap';



const WeatherButton = ({cities}) => {
    const [city,setCity] = useState('')
    const searchCity = (current) =>{
        console.log(current)
        setCity(current)
    }
    console.log("cities",cities)
  return (
    <div>
       <Button variant="warning">현재위치</Button>
       {cities.map((item,index)=>{
       return <Button variant="warning" key={index} onClick={()=>searchCity(item)}>{item}</Button>
       })}
    </div>
  )
}

export default WeatherButton
