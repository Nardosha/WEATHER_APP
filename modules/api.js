import {showWeather, showForecast} from "./view.js";
import {WEATHER_TYPE} from "./variables.js"
import {convertToDate, convertToTime, tempConvert} from "./helper.js";

function getCurrentWeather(cityName, type) {
    console.log('Load weather. Type', type)
    const url = getUrl(cityName, type)

    fetch(url)
        .then(response => response.json())
        .then(weather => type === WEATHER_TYPE.currentWeather ? showWeather(weather) : showForecast(weather))
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
    const apiKey = '1041b355b3b6422eb66d9f5e517f7b52'
    return `${serverUrl}${type}?q=${city}&appid=${apiKey}`
}

function getCurrentWeatherData(cityName) {
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

function getForecastWeatherData(data) {
    console.log(data)
    let {
        city: {
            name,
        },
        list: [{
            dt,
            main: {
                temp,
                feels_like,
            },
            weather: [{
                main,
                icon,
            }
            ]
        }]
    } = data

    const tempCelc = tempConvert(temp)
    const feelsCelc = tempConvert(feels_like)
    const day = convertToDate(dt)
    const time = convertToTime(dt)

    return {
        'City': name,
        'Temperature': tempCelc,
        "Feels like": feelsCelc,
        iconWeather: icon,
        'Weather': main,
        'day': day,
        'time': time,
    }
}

export {
    getUrl,
    getCurrentWeather,
    getCurrentWeatherData,
    WEATHER_TYPE,
    getForecastWeatherData,
}