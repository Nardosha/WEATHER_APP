import {showWeather, showForecast} from "./view.js";
import {WEATHER_TYPE} from "./variables.js"

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

export {
    getUrl,
    getCurrentWeather,
}