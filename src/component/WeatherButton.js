import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({cities}) => {
    console.log("cities",cities)
  return (
    <div>
       <Button variant="warning">현재위치</Button>
       {cities.map((item)=>{
       return <Button variant="warning">{item}</Button>
       })}
    </div>
  )
}

export default WeatherButton
