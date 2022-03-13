import {showWeather} from "./view.js";
import { MONTH, WEATHER_TYPE } from "./variables.js"

function getCurrentWeather(url) {
    console.log('Load weather')

    fetch(url)
        .then(response => response.json())
        .then(weather => {
            fetch(getUrl(weather.name, WEATHER_TYPE.forecast))
                .then(res => res.json())
                .then(forecast => showWeather(weather, forecast))
        })
        .catch(err => {
            if (err.cod >= 400) {
                console.log(err)
                alert(err.message)
            }
            if (err.name === 'TypeError') {
                console.log(err)
                alert('Error! Try again later!')
            }
        })
}

function getUrl(city, type) {
    console.log(type)
    const serverUrl = 'https://api.openweathermap.org/data/2.5/'
    // const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f'
    const apiKey = '1041b355b3b6422eb66d9f5e517f7b52'
    return `${serverUrl}${type}?q=${city}&appid=${apiKey}`
}

function currentWeatherData(cityName) {
    const tempCelc = tempConvert(cityName.main?.temp)
    const feelsCelc = tempConvert(cityName.main?.feels_like)
    const sunrise = convertToTime(cityName.sys?.sunrise)
    const sunset = convertToTime(cityName.sys?.sunset)

    return {
        'City': cityName.name,
        'Temperature': tempCelc,
        "Feels like": feelsCelc,
        iconWeather: cityName.weather[0].icon,
        'Weather': cityName.weather[0].main,
        'Sunrise': sunrise,
        'Sunset': sunset,
    }
}

function forecastWeatherData(data) {
    const tempCelc = tempConvert(data.list[0].main?.temp)
    const feelsCelc = tempConvert(data.list[0].main?.feels_like)

    const unixData = Date.parse(data.list[0].dt_txt) / 1000
    const day = convertToDate(unixData)
    const time = convertToTime(unixData)

    return {
        'City': data.city.name,
        'Temperature': tempCelc,
        "Feels like": feelsCelc,
        iconWeather: data.list[0].weather[0].icon,
        'Weather': data.list[0].weather[0].main,
        'day': day,
        'time': time,
    }
}


function convertToDate(date) {
    const dateUnix = new Date(date)
    const day = dateUnix.getDate()
    const monthNumber = dateUnix.getUTCMonth()
    const month = getMonth(monthNumber)
    return `${day} ${month}`
}

function getMonth(date) {
    date = date.toString()
    for (let key in MONTH) {
        if (key === date) {
            return MONTH[key]
        }
    }
}

function convertToTime(date) {
    const dateUnix = new Date(date * 1000)
    let minutes = dateUnix.getMinutes()
    minutes = minutes === 0 ? '00' : minutes
    let hours = dateUnix.getHours()
    return `${hours}:${minutes}`
}

function tempConvert(tempKelvin) {
    const Kelvin = 273.15
    return Math.round(tempKelvin - Kelvin)
}

export {
    getUrl,
    getCurrentWeather,
    currentWeatherData,
    WEATHER_TYPE,
    forecastWeatherData,
}