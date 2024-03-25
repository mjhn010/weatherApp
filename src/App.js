import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";


import { useEffect, useState } from "react";


//아이콘이 맑음이라면 비디오를 맑음으로 설정한다.
//상황별로 설정을 어떻게 해야할까 ?
//1.날씨별함수만들기.
//2.매개변수로 값전달
//3.값에 따라 설정해주기 ?


//날짜별 온도 보여주기
// 버튼이 아닌 즐겨찾기로 내가 원하는 지역 보여주기.



//1. 앱이 실행되자마자 현재위치기반의 날씨가 보인다.
//2. 날씨정보에는 도시, 섭씨, 화씨, 날씨상태
//3. 5개의 버튼이있다.(1개는 현재위치 4개는 다른도시)
//4. 도시버튼을 클릭할때 마다 도시별 날씨가 나온다.
//5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.
//6. 데이터를 들고오는 동안 로딩 스피너가 돈다.
function App() {
  //날씨 아이디 한국어번역
  const [weather, setWeather] = useState(null)
  const cities = ["paris", "new York", "tokyo", "seoul"]
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)
  const [error,setError] = useState('');
  const [date,setDate] =useState('')
  const [icon,setIcon] = useState('')
  const [inputs, setInputs] = useState('')
  
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      getWeatherByCurrentLocation(lat, lon)
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e9219e5484bce1b002d6150a04d17c95&units=metric`;
      setLoading(true)
      let response = await fetch(url)
      let data = await response.json()
      setWeather(data)
      setIcon(data.weather[0].icon)
      console.log(data.weather[0].icon)
      setLoading(false)
    }catch(error){
      setError(error.message)
      setLoading(false)
    }
  };
  const getWeatherByCity = async () => {
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e9219e5484bce1b002d6150a04d17c95&units=metric`
      setLoading(true)
      let response = await fetch(url)
      let data = await response.json()
      setWeather(data)
      setIcon(data.weather[0].icon)
      setLoading(false)
    }catch(error){
      setError(error.message)
      setLoading(false)
    }
  }
  const handleCityChange = (city)=>{
    if(city == "현재위치"){
      setCity('')
    }else{
      setCity(city)
    }
  }
  const todayData = () => {
    const week = ['일','월','화','수','목','금','토'];
    let now = new Date();
    let todayMonth = (now.getMonth()+1) > 9 ? (now.getMonth()+1) : (now.getMonth()+1);
    let todayDate = now.getDate() > 9 ? now.getDate() : '0' + now.getDate();
    let dayOfWeek = week[now.getDay()];
    setDate(todayMonth + '월 ' + todayDate + '일 ' + dayOfWeek + '요일') 
}
const inputHandler = async (e) =>{
  if(e.key == "Enter"){   
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputs}&appid=e9219e5484bce1b002d6150a04d17c95&units=metric`
      let response = await fetch(url)
      let data = await response.json()
      setWeather(data)
    }catch(error){
      setError(error.message)
        setLoading(false)
    }
  }
}
  useEffect(() => {
    todayData()
    if (city == '') {
      getCurrentLocation()
    } else {
      getWeatherByCity()
    }

  }, [city]);


  return (
    <div>
      {loading ?(<div className="container">
          <ClipLoader
            color='#000000'
            loading={loading}
            size={150}
          /></div>)
         : !error ? (<div className="container">
          <WeatherBox weather={weather} date={date} icon={icon}/>
          <input onKeyDown={inputHandler} value={inputs} onChange={(e)=>{setInputs(e.target.value)}}/>
          <WeatherButton cities={cities}  handleCityChange={handleCityChange}  setCity={setCity}  selectedCity={city} />
        </div>):error}
    </div>
  );
}

export default App;

