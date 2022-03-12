const searchForm = document.querySelector('.search-block__form')
const tabNowTemp = document.querySelector('.tab-now_temp')
const tabNowIcon = document.querySelector('.tab-now_icon')
const tabNowCity = document.querySelector('.tab-now_city-name')

// const serverUrl = 'http://api.openweathermap.org/data/2.5/weather?q=boston&appid=f660a2fb1e4bad108d6160b7f58c555f'

getDefaultCityWeather()

function getDefaultCityWeather() {
    const defaultCity = 'Saint Petersburg'
    const defUrl = getUrl(defaultCity)
    getWeather(defUrl)
}

function getWeather(url) {
    fetch(url)
        .then(response => response.json())
        .then(response => new Promise((res, rej) => {
            if (response.cod >= 400) {
                rej(alert(`Status 404. City not found!`))
            }
            res(showWeather(response))
        }))
        .catch(err => {
            if (err.name === 'TypeError') {
                console.log(err)
                alert('Error! Try again later!')
            }
        })
}

function getUrl(city) {
    const serverUrl = 'https://api.openweathermap.org/data/2.5/weather'
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f'
    return `${serverUrl}?q=${city}&appid=${apiKey}`
}

function showWeather(data) {
    const city = data.name
    const iconCode = data['weather'][0].icon
    const weatherKelvin = data['main']['temp']
    const temp = tempConvert(weatherKelvin)

    tabNowTemp.innerHTML = `${temp}&deg;C`
    tabNowIcon.style.background = `url('https://openweathermap.org/img/wn/${iconCode}@2x.png') center center /contain no-repeat`
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
    getWeather,
}