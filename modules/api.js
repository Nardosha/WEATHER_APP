'use strict';
const searchForm = document.querySelector('.search-block__form')
const serverUrl = 'http://api.openweathermap.org/data/2.5/weather'
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f'
// const serverUrl = 'http://api.openweathermap.org/data/2.5/weather?q=boston&appid=f660a2fb1e4bad108d6160b7f58c555f'

searchForm.onsubmit = function(e) {
    e.preventDefault()
    const cityName = document.querySelector('.search-block__input').value

    getUrl(cityName)
        .then(weatherData => showWeather(weatherData))
        .catch(err => alert(err))
}


function getUrl(city) {
    console.log(city)
    const url = `${serverUrl}?q=${city}&appid=${apiKey}`
    return sendRequest(url)
}

function sendRequest(url) {
    console.log(url)
    return fetch(url)
        .then(response => response.json())

}

function showWeather(data) {
    const tab = document.getElementById('tab_now')
    const city = data.name

    const icon = document.createElement('img')
    const iconCode = data['weather'][0].icon
    icon.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`

    const weatherKelvin = data['main']['temp']
    const temp = tempConvert(weatherKelvin)
    tab.innerHTML = `${temp}&deg;C <br> ${city}`
    tab.append(icon)
}

function tempConvert(temp) {
    const Kelvin = 273.15
    return Math.round(temp - Kelvin)
}
// C = K - 273.15