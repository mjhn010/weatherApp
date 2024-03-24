import { Button } from 'react-bootstrap';
import "../App.css";



const WeatherButton = ({cities, setCity,handleCityChange,selectedCity}) => {
    console.log("cities",cities)
  return (
    <div>
       <Button  className={`${selectedCity == '' ? "active":"btn-6"}`} onClick={()=>handleCityChange("현재위치")}>현재위치</Button>
       {cities.map((item,index)=>{
       return <Button className={`${selectedCity == item ? "active":"btn-6"}`} key={index} onClick={()=>setCity(item)}>{item}</Button>
       })}
    </div>
  )
}

export default WeatherButton
