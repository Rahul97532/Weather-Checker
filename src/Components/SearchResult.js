import React,{useState,useEffect} from 'react';
import {isoCountries} from '../Country Code/CountryCode';
import WeatherIcon from "react-icons-weather";
function SearchResult() {

    const [resultFound,setResultFound]=useState(true)

    const [userCity,setUserCity]=useState('')
    const [data, setData] = useState(null);
    const [cityName, setCityName] = useState('Sonipat');
    const fetchData= async ()=>{
        // console.log(cityName);
        try{
            // setResultFound(true)
            const response=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=fa8b4a88fce099c5eb9dbf6a92068e25`);
            const true_resp=await response.json()
            setData(true_resp);
        }catch(e){
            setResultFound(false);
            console.log(e);
        }
        
        
        // console.log(ccode);
        
    }
    useEffect(()=>{fetchData()},[cityName]);
    // useEffect(()=>{fetchData()},[userCity]);
    
    // const ccode=!data?'':data.sys.country;
    // console.log(ccode);
    // !resultFound? return (<p>Sorry, No result found for city named {cityName}</p>):
    if(!resultFound){
        {console.log(resultFound);}
        return(
            
            <p>Sorry!! No data found for city named {cityName}</p>
        )
    }
    else{
        
    }
    return (
        <div className='main'>
            <div className="input">
                <input type="search" 
                    value={userCity} 
                    placeholder='Your City'
                    onChange={(event)=>{
                        setUserCity(event.target.value);
                        // console.log(event.target.value)
                }}/>
                <button onClick={()=>{
                    !userCity?alert('Please enter a valid city name.'):setCityName(userCity)
                    }}>Click</button>
            </div>  
            
            <div className="temp_main">
                {!data? <p>No data found</p>: 
                    <div className='inner_main'>
                        <div className="icon">
                            <WeatherIcon className='icon1' name="owm" fixedWidth={100} iconId={data.weather[0].id} flip="horizontal" rotate="90" />
                            <p className='weather_type'>{data.weather[0].main}</p>
                            <p className="city">{data.name}</p>
                            <p className="country">{isoCountries[data.sys.country].name}</p>
                        </div>
                        <div className="temp_section">
                            <div className="temperature_info">
                                <p className='temp'>{Math.round(data.main.temp-273.15)}</p>
                                <i className="far fa-circle"></i>    
                            </div>
                            <div className="min_max_temperature_info">
                                <span>
                                    <p className='temp-m-m'>{Math.round(data.main.temp_min-273.15)}</p>
                                </span>
                                  
                                <span>/</span>
                                <span>
                                    <p className='temp-m-m'>{Math.round(data.main.temp_max-273.15)}</p>
                                </span>                                
                            </div>
                            <div className="date_time">
                                <p className="date">{new Date().toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className="other_factors">
            {
                !data? null:
                <>
                <div className="humidity factor">
                    <div className="drops">
                        <i class="fas fa-tint"></i>
                        <i class="fas fa-tint"></i>
                        <i class="fas fa-tint"></i>
                    </div>
                    <p className='other_factors_head'>humidity</p>
                    <p>{data.main.humidity}%</p>
                </div>
                <div className="wind factor">
                    <i class="fas fa-wind"></i>
                    <p className='other_factors_head'>wind</p>
                    <p className='other_factors_value'>{data.wind.speed} Km/h</p>

                </div>
                <div className="sun factor">
                    <i class="fas fa-sun"></i>
                    <p className='other_factors_head'>Sunrise: </p>
                    <p className='other_factors_value'>{new Date(1000*data.sys.sunrise).toLocaleTimeString()}</p>
                    {/* <p className='other_factors_value'>{new Date((data.sys.sunrise+data.timezone)*1000)}</p> */}
                    {console.log(new Date((data.sys.sunrise-data.timezone)*1000))}
                    {/* <p className='other_factors_value'>{new Date((data.sys.sunrise+data.timezone)*1000).toLocaleTimeString()}</p> */}
                    <p className='other_factors_head'>Sunset: </p>
                    <p className='other_factors_value'>{new Date(1000*data.sys.sunset).toLocaleTimeString()}</p>
                </div>
                <div className="pressure factor">
                    <i class="fab fa-product-hunt"></i>
                    <p className='other_factors_head'>Pressure</p>
                    <p className="other_factors_value">{data.main.pressure} Pa</p>
                    
                </div>
                </>
            
            
            }
            </div>
                
            
            
            {!data ? null:console.log(data)}
        </div>
    )
}

export default SearchResult
