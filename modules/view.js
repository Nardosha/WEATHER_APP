import {UI, URL, FORECAST_LIST_LENGTH} from "./variables.js"
import {getWeatherNowFromJson, getWeatherForecastFromJson} from './helper.js'
import {removeItemFromLocalStorage, setItemToLocalStorage} from "./localStorage.js";
import {
    checkCity,
    toggleSaveBtn,
    deleteCity,
    createCityItem,
    addCityToSavedCities,
    getNextCity
} from './actionHandler.js'

function toggleTab(e) {
    e.preventDefault()

    if (e.target.dataset) {
        const currentTab = e.target
        const currentTabAttribute = currentTab.dataset.tab
        const tabsBlock = Array.from(UI.tabBlockContainer.children)
        const currentTabBlock = document.getElementById(`tab_${currentTabAttribute}`)
        const tabs = Array.from(UI.tabContainer.children)

        tabs.map(tab => {
            if (tab.classList.contains('_active')) {
                tab.classList.remove('_active')
            }
        })
        tabsBlock.map(tabBlock => {
            if (tabBlock.classList.contains('_active')) {
                tabBlock.classList.remove('_active')
            }
        })
        currentTab.classList.toggle('_active')
        currentTabBlock.classList.toggle('_active')
    }
}

function showWeather(json) {
    const weatherData = getWeatherNowFromJson(json);

    // NOW
    UI.NOW_CITY.innerHTML = `${weatherData.name}`
    UI.NOW_TEMP.innerHTML = `${weatherData.temp}&deg;C`
    UI.NOW_ICON.style.background = `url("${URL.ICON}${weatherData.icon}@2x.png") center center /contain no-repeat`

    // DETAILS
    setDetailsWeather(json)
}

function setDetailsWeather(json) {
    const weatherData = getWeatherNowFromJson(json)
    UI.DETAILS_CITY.textContent = weatherData.name
    UI.DETAILS_TEMP.innerHTML = `${UI.DETAILS_TEMP.dataset.details}: ${weatherData.temp}&deg;C`
    UI.DETAILS_FEELS.innerHTML = `${UI.DETAILS_FEELS.dataset.details}: ${weatherData.feels}&deg;C`
    UI.DETAILS_WEATHER.textContent = `${UI.DETAILS_WEATHER.dataset.details}: ${weatherData.main}`
    UI.DETAILS_SUNRISE.textContent = `${UI.DETAILS_SUNRISE.dataset.details}: ${weatherData.sunrise}`
    UI.DETAILS_SUNSET.textContent = `${UI.DETAILS_SUNSET.dataset.details}: ${weatherData.sunset}`
}

function showForecast(data) {
    const forecastList = data.list
    forecastList.length = FORECAST_LIST_LENGTH
    UI.tabForecastCity.textContent = data.city.name
    UI.tabForecastContainer.innerHTML = ''

    forecastList.forEach(item => {
        const forecastData = getWeatherForecastFromJson(item)
        setForecastWeather(forecastData)
    })
}

function setForecastWeather({day, time, temp, feels, icon, main}) {
    const forecastItemHourly = UI.tabForecastWeather.cloneNode(true);

    forecastItemHourly.querySelector('.forecast-weather__day-month').textContent = day
    forecastItemHourly.querySelector('.forecast-weather__day-time').textContent = `${time}`
    forecastItemHourly.querySelector('.forecast-weather__temp-celc').innerHTML = `${UI.tabForecastTemp.dataset.details} ${temp}&deg;`
    forecastItemHourly.querySelector('.forecast-weather__temp-feels').innerHTML = `${UI.tabForecastFeels.dataset.details} ${feels}&deg;`
    forecastItemHourly.querySelector('.forecast-weather__main-icon_name').textContent = `${main}`
    forecastItemHourly.querySelector('.forecast-weather__main-icon_icon').style.background = `url("${URL.ICON}${icon}@2x.png") center center /cover no-repeat`
    forecastItemHourly.id = 'forecast-weather-show'
    UI.tabForecastContainer.append(forecastItemHourly)
}

function handlerSavingCity(cityName, type) {
    const cityIsSaved = checkCity(cityName);

    if (type === 'set') {
        toggleSaveBtn(cityIsSaved)
        return;
    }

    if (type === 'default') {
        setItemToLocalStorage(cityName, cityName)
        createCityItem(cityName)
        toggleSaveBtn(cityIsSaved)
        return;
    }

    if (type === 'remove') {
        deleteCity(cityName)
        toggleSaveBtn(!cityIsSaved)
        getNextCity(cityName)
        return;
    }

    if (cityName !== UI.NOW_CITY.innerHTML && cityIsSaved) {
        deleteCity(cityName)
        return
    }

    toggleSaveBtn(!cityIsSaved, cityName)

    if (!cityIsSaved) {
        createCityItem(cityName)
        setItemToLocalStorage(cityName, cityName)
        addCityToSavedCities(cityName)
    }

    if (cityIsSaved) {
        deleteCity(cityName)
        removeItemFromLocalStorage(cityName)
    }
}

export {
    toggleTab,
    showWeather,
    handlerSavingCity,
    checkCity,
    toggleSaveBtn,
    showForecast,
    addCityToSavedCities,
}
