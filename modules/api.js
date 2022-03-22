import {showWeather, showForecast} from "./view.js";
import {WEATHER_TYPE, URL} from "./variables.js"

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
    return `${URL.WEATHER.SERVER_URL}${type}?q=${city}&appid=${URL.WEATHER.API_KEY}`
}

export {
    getUrl,
    getCurrentWeather,
}