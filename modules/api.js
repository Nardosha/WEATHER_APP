const searchForm = document.querySelector('.search-block__form')
const tabNowTemp = document.querySelector('.tab-now_temp')
const tabNowIcon = document.querySelector('.tab-now_icon')
const tabNowCity = document.querySelector('.tab-now_city-name')
const tabDetailsInfo = document.querySelector('.tab-details_info')


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

function showWeather(data) {
    const weatherData = createObj(data);

    // NOW
    tabNowCity.innerHTML = `${weatherData.City}`
    tabNowTemp.innerHTML = `${weatherData.Temperature}&deg;C`
    tabNowIcon.style.background = `url('https://openweathermap.org/img/wn/${weatherData.iconWeather}@2x.png') center center /contain no-repeat`

    // DETAILS
    // const detailsCity = document.querySelector('.tab-details_info-city')
    // const detailsTemp = document.querySelector('.tab-details_info-temp')
    // const detailsFeels = document.querySelector('.tab-details_info-feels')
    // const detailsWeather = document.querySelector('.tab-details_info-weather')
    // const detailsSunrise = document.querySelector('.tab-details_info-sunrise')
    // const detailsSunset = document.querySelector('.tab-details_info-sunset')
    // detailsCity.innerHTML = `${weatherData.city}`
    // detailsTemp.innerHTML = `Temperature: ${weatherData.temp}&deg;`
    // detailsFeels.innerHTML = `Feels like: ${weatherData["Feels like"]}&deg;`
    // detailsWeather.innerHTML = `Weather: ${weatherData.Weather}`
    // detailsSunrise.innerHTML = `Sunrise: ${weatherData.Sunrise}`
    // detailsSunset.innerHTML = `Sunset: ${weatherData.Sunset}`

    const ulDetailsInfo = Array.from(tabDetailsInfo.children)
    const weatherDataObject = Object.entries(weatherData)
    ulDetailsInfo.forEach(li => {
        weatherDataObject.map(obj => {
            if (li.dataset.details === obj[0]) {
                if (li.dataset.details === 'City') {
                    li.innerHTML = `${obj[1]}`
                }
                if (li.dataset.details === 'Temperature' || li.dataset.details === 'Feels like') {
                    li.innerHTML = `${obj[0]}: ${obj[1]}&deg;`
                } else {
                    li.innerHTML = `${obj[0]}: ${obj[1]}`
                }
            }
        })
    })
}

function createObj(cityName) {
    // temp
    const tempCelc = tempConvert(cityName.main?.temp)
    const feelsCelc = tempConvert(cityName.main?.feels_like)
    // sunrise
    const sunriseUnix = cityName.sys?.sunrise
    const sunriseDate = new Date(sunriseUnix * 1000)
    const sunrise = `${sunriseDate.getHours()}:${sunriseDate.getMinutes()}`
    // sunset
    const sunsetUnix = cityName.sys?.sunset
    const sunsetDate = new Date(sunsetUnix * 1000)
    const sunset = `${sunsetDate.getHours()}:${sunsetDate.getMinutes()}`

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

function tempConvert(tempKelvin) {
    const Kelvin = 273.15
    return Math.round(tempKelvin - Kelvin)
}

export {
    searchForm,
    getUrl,
    showWeather,
    getWeather,
}