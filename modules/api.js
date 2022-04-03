import {showWeather, showForecast} from "./view.js";
import {WEATHER_TYPE, URL} from "./variables.js"

async function getWeather(cityName) {
    const urlWeather = getCurrentWeatherUrl(cityName)
    const urlForecast = getForecastUrl(cityName)

    try {
        let currentWeather = await fetch(urlWeather)
        let forecast = await fetch(urlForecast)

        let weatherResponse = await currentWeather.json()
        let forecastResponse = await forecast.json()

        await showWeather(weatherResponse)
        await showForecast(forecastResponse)

    } catch(err) {
        alert('Something went wrong :(')
    }
}

function getCurrentWeatherUrl(city) {
    return `${URL.WEATHER.SERVER_URL}${WEATHER_TYPE.currentWeather}?q=${city}&appid=${URL.WEATHER.API_KEY}`
}
function getForecastUrl(city) {
    return `${URL.WEATHER.SERVER_URL}${WEATHER_TYPE.forecast}?q=${city}&appid=${URL.WEATHER.API_KEY}`
}

export {
    getWeather,
}