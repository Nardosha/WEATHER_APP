import { UI, URL, FORECAST_LIST_LENGTH } from "./variables.js"
import { getWeatherNowFromJson, getWeatherForecastFromJson } from './helper.js'
import {removeItemFromLocalStorage, setItemToLocalStorage} from "./localStorage.js";

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

    let cityIsSaved = checkCity(weatherData.name)
    toggleSaveBtn(cityIsSaved, weatherData.name)
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

function handlerSavingCity(city) {
    const currentCity = UI.saveBtn.previousElementSibling.innerHTML
    let cityName = city ? city : currentCity

    // Проверяем наличие города в списке
    const cityIsSaved = checkCity(cityName);

    // Проверяем открыт ли тот город, который хотим удалить из списка
    if (cityName !== currentCity) {
        removeCityItem(cityName)
        return
    }
    // Переключаем кнопку
    toggleSaveBtn(!cityIsSaved, cityName)

    // Удаляем/сохраняем город в соответствии с cityIsSaved
    cityIsSaved
        ? removeCityItem(cityName)
        : createCityItem(cityName)
}

function toggleSaveBtn(cityIsSaved, cityName) {
    console.log('SaveBtn. CityIsSaved:', cityIsSaved)
    if (cityIsSaved) {
        UI.saveBtn.classList.add('_active')
        setItemToLocalStorage(cityName, `CITY_${cityName}`)
    } else {
        UI.saveBtn.classList.remove('_active')
        removeItemFromLocalStorage(`CITY_${cityName}`)
    }
    console.log('SaveBtn. Active', cityIsSaved)
}

function checkCity(cityName) {
    if (document.getElementById(`${cityName}`)) {
        console.log('Checking. City is saved', true)
        return true
    }
    console.log('Checking. City is not saved', false)
    return false
}

function removeCityItem(cityName) {
    console.log('Remove city', cityName)
    document.getElementById(`${cityName}`).remove()
}

function createCityItem(city) {
    let currentCity = UI.hideCity.cloneNode(true)
    currentCity.id = `${city}`
    currentCity.querySelector('.locations-block__item-city').textContent = city
    UI.cityList.append(currentCity)
    console.log(currentCity)
}

export {
    toggleTab,
    showWeather,
    handlerSavingCity,
    checkCity,
    toggleSaveBtn,
    showForecast
}
