//API KEY
/* 4b3b26fd651dcca0abf9605cf247ff25*/
//URL is missTyped due to limited access.

let cityName = document.querySelector(".city");
//cityName.innerHTML= "Kolkata";
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
//w_forecast.innerHTML = "Clear";
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTemp = document.querySelector(".weather_min");
let w_maxTemp = document.querySelector(".weather_max");


let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humudity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let citySearch = document.querySelector(".weather_search");

const getCountryName = (code) => {
    return new Intl.DisplayNames([code], {type:"region"}).of(code);
};
const getDateTime = (dt) => {
    const currDate = new Date(dt * 1000);
    //console.log(currDate);

    const options = {
        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric",
        hour:"numeric",
        minute:"numeric",
    };

    const formatter = new Intl.DateTimeFormat("en-US", options);
    //console.log(formatter);
    return formatter.format(currDate);
};

let city = "kolkata";

citySearch.addEventListener('submit', (e) => {
    e.preventDefault();

    let cityName = document.querySelector(".city_name");
    //console.log(cityName.value);
    city = cityName.value;

    getWeatherData();
    
    cityName.value = "";
});

const getWeatherData = async() => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=4b3b26fd651dcca0abf9605cf247ff25`;
    try{
    const res = await fetch(weatherUrl);
    const data = await res.json(); 
    //console.log(data);

    const {main, name, weather, wind, sys, dt} = data;

    cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
    dateTime.innerHTML = getDateTime(dt);

    w_forecast.innerHTML = weather[0].main;
    w_icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;

    w_temperature.innerHTML = `${(main.temp - 273.15).toFixed(2)}&#176`;

    const main_temp =  w_temperature.innerHTML = `${(main.temp - 273.15).toFixed(2)}&#176`;

    w_minTemp.innerHTML = `Min: ${(main.temp_min - 273.15).toFixed()}&#176`;
    w_maxTemp.innerHTML = `Max: ${(main.temp_max - 273.15).toFixed()}&#176`;

    w_feelsLike.innerHTML = `${(main.feels_like - 273.15).toFixed(2)}&#176`;
    w_humudity.innerHTML = `${main.humidity}%`;
    w_wind.innerHTML = `${wind.speed} m/s`;
    w_pressure.innerHTML = `${main.pressure} hPa`
    } catch(error){
        alert(error);
    }

};

document.body.addEventListener("load" , getWeatherData());



