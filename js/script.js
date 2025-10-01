const WEATHER_API = "c4494b12bd81615688332fc78161f19f"
async function getCurrentWeather(latitude, longitude) {
    let weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API}&units=metric`)
    return await weather.json()
}


const weatherForm = document.querySelector('.weather-form');
const weatherContainer = document.querySelector('.weather-container');
let weatherTemp = document.getElementById('temperature');
let weatherIcon = document.getElementById('weather-img');
let weatherFeelsLike = document.getElementById('feels-like');
let weatherHumidity = document.getElementById('humidity');
let weatherWindSpeed = document.getElementById('wind-speed');
let weatherRequestTime = document.getElementById('request-time');

weatherForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const weatherData = new FormData(weatherForm);
    const latitude = weatherData.get("latitude").replace(",",".");
    const longitude = weatherData.get("longitude").replace(",",".")
    let weatherInfo = await getCurrentWeather(latitude, longitude)
    let weatherTime = new Date(weatherInfo.dt * 1000)
    weatherContainer.style.display = 'flex';
    weatherTemp.textContent = weatherInfo.main.temp + " °C";
    weatherTemp.style.fontSize = '25px';
    weatherIcon.src = `https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`
    weatherFeelsLike.textContent = "Ощущается как: " + weatherInfo.main.feels_like + " °C";
    weatherHumidity.textContent = "Влажность: " + weatherInfo.main.humidity + "%";
    weatherWindSpeed.textContent = "Ветер: " + weatherInfo.wind.speed + " м/c";
    weatherRequestTime.textContent = "Время получения данных: " + weatherTime.getHours() + ":" + weatherTime.getMinutes();
    console.log(weatherTemp, weatherInfo.weather[0].icon, weatherInfo.main.feels_like, weatherInfo);
})