import {showWeather} from "./view.js";

const searchForm = document.querySelector('.search-block__form')



function getWeather(url) {
    console.log('Load weather')
    fetch(url)
        .then(response => response.json())
        .then(response => {
            showWeather(response)
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

function getUrl(city) {
    const serverUrl = 'https://api.openweathermap.org/data/2.5/weather'
    // const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f'
    const apiKey = '1041b355b3b6422eb66d9f5e517f7b52'
    return `${serverUrl}?q=${city}&appid=${apiKey}`
}

function createObj(cityName) {
    const tempCelc = tempConvert(cityName.main?.temp)
    const feelsCelc = tempConvert(cityName.main?.feels_like)
    const sunrise = convertDate(cityName.sys?.sunrise)
    const sunset = convertDate(cityName.sys?.sunset)

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

function convertDate(date) {
    const dateUnix = new Date(date * 1000)
    return `${dateUnix.getHours()}:${dateUnix.getMinutes()}`
}

function tempConvert(tempKelvin) {
    const Kelvin = 273.15
    return Math.round(tempKelvin - Kelvin)
}

export {
    searchForm,
    getUrl,
    getWeather,
    createObj,
}