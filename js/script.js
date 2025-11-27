import { getMap } from './map.js'

const WEATHER_API = "c4494b12bd81615688332fc78161f19f"
async function getCurrentWeather(latitude, longitude) {
    let weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API}&units=metric`)
    return await weather.json()
}


const weatherForm = document.querySelector('.weather-form');
let weatherContainer = document.querySelector('.weather-container');
let weatherTemp = document.querySelector('.temperature');
let weatherIcon = document.querySelector('.weather-img');
let weatherFeelsLike = document.querySelector('.feels-like');
let weatherHumidity = document.querySelector('.humidity');
let weatherWindSpeed = document.querySelector('.wind-speed');
let weatherRequestTime = document.querySelector('.request-time');

let showMapButton = document.querySelector('.show-map');
let mapContainer = document.getElementById('map');

let weatherWidgets = document.querySelector('.weather-widgets');
let addButton = document.querySelector('.add-widget');


weatherForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const weatherData = new FormData(weatherForm);
    const latitude = weatherData.get("latitude").replace(",",".");
    const longitude = weatherData.get("longitude").replace(",",".")
    let weatherInfo = await getCurrentWeather(latitude, longitude)
    let weatherTime = new Date(weatherInfo.dt * 1000)
    getMap([latitude, longitude], "Вы здесь")
    weatherContainer.style.display = 'flex';
    weatherContainer.style.flexDirection = 'column';
    weatherTemp.textContent = Math.round(weatherInfo.main.temp) + " °C";
    weatherTemp.style.fontSize = '25px';
    weatherIcon.src = `https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`
    weatherFeelsLike.textContent = "Ощущается как: " + Math.round(weatherInfo.main.feels_like) + " °C";
    weatherHumidity.textContent = "Влажность: " + weatherInfo.main.humidity + "%";
    weatherWindSpeed.textContent = "Ветер: " + weatherInfo.wind.speed + " м/c";
    weatherRequestTime.textContent = "Время получения данных: " + weatherTime.getHours().toString().padStart(2, "0") + ":" + weatherTime.getMinutes().toString().padStart(2, "0");
    weatherContainer = document.querySelector('.weather-container')
})

showMapButton.addEventListener('click', async (event) => {
    if (showMapButton.textContent === 'Показать на карте') {
        showMapButton.textContent = "Скрыть"
        mapContainer.style.display = 'block';
    }
    else{
        showMapButton.textContent = "Показать на карте"
        mapContainer.style.display = 'none';
    }
})


addButton.addEventListener('click', (event) => {
    const newWidget = weatherContainer.cloneNode(true);
    weatherWidgets.appendChild(newWidget);
    weatherWidgets.querySelector(".add-widget").remove();
    weatherWidgets.querySelector(".show-map").remove();
})
