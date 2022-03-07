'use strict';

const searchForm = document.querySelector('.search-block__form')
const tabNowTemp = document.querySelector('.tab-now_temp')
const tabNowIcon = document.querySelector('.tab-now_icon')
const tabNowCity = document.querySelector('.tab-now_city-name')

const serverUrl = 'http://api.openweathermap.org/data/2.5/weather'
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f'

// const serverUrl = 'http://api.openweathermap.org/data/2.5/weather?q=boston&appid=f660a2fb1e4bad108d6160b7f58c555f'

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
    const city = data.name
    const iconCode = data['weather'][0].icon
    const weatherKelvin = data['main']['temp']
    const temp = tempConvert(weatherKelvin)

    tabNowTemp.innerHTML = `${temp}&deg;C`
    tabNowIcon.style.background = `url('http://openweathermap.org/img/wn/${iconCode}@2x.png') center center /contain no-repeat`
    tabNowCity.innerHTML = `${city}`
}

function tempConvert(temp) {
    const Kelvin = 273.15
    return Math.round(temp - Kelvin)
}

export {
    searchForm,
    getUrl,
    showWeather,

}