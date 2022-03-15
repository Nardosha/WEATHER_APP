import {getCurrentWeatherData, getForecastWeatherData} from './api.js'
import { UI, URL } from "./variables.js"
import  {setForecastWeather} from './setForecastWeather.js'

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

function showWeather(weather) {
    console.log('Show weather')
    const weatherData = getCurrentWeatherData(weather);

    // NOW
    UI.tabNowCity.innerHTML = `${weatherData.City}`
    UI.tabNowTemp.innerHTML = `${weatherData.Temperature}&deg;C`
    UI.tabNowIcon.style.background = `url("${URL.ICON}${weatherData.iconWeather}@2x.png") center center /contain no-repeat`

    // DETAILS
    const ulDetailsInfo = Array.from(UI.tabDetailsInfo.children)
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

    let cityIsSaved = checkCity(weatherData.City)
    toggleSaveBtn(cityIsSaved)
}

function showForecast(weatherData) {

    console.log('Show forecast')
    const forecastList = weatherData.list
    UI.tabForecastCity.textContent = weatherData.city.name

    // const container = UI.tabForecastContainer.cloneNode(true);
    // UI.tabForecastList.removeChild(UI.tabForecastContainer)
    // UI.tabForecastContainer.remove()
    // console.log(container)
    // container.classList.replace('tab-forecast__container-clone', 'tab-forecast__container')
    //
    forecastList.forEach(item => {
        const forecastData = getForecastWeatherData(item)
        // setW(forecastData, container)
        setForecastWeather(forecastData, UI.tabForecastContainer)
    })
    // UI.tabForecastList.append(container)
}
// function setW({day, time, temp, feels, icon, main}, container) {
//     const newTabForecastCont = container.querySelector('.tab-forecast__weather').cloneNode(true);
//
//     newTabForecastCont.querySelector('.forecast-weather__day-month').textContent = day
//     newTabForecastCont.querySelector('.forecast-weather__day-time').textContent = `${time}`
//     newTabForecastCont.querySelector('.forecast-weather__temp-celc').innerHTML = `${UI.tabForecastTemp.dataset.details} ${temp}&deg;`
//     newTabForecastCont.querySelector('.forecast-weather__temp-feels').innerHTML = `${UI.tabForecastFeels.dataset.details} ${feels}&deg;`
//     newTabForecastCont.querySelector('.forecast-weather__main-icon_name').textContent = `${main}`
//     newTabForecastCont.querySelector('.forecast-weather__main-icon_icon').style.background = `url("${URL.ICON}${icon}@2x.png") center center /cover no-repeat`
//     container.append(newTabForecastCont)
// }

function handlerSavingCity(city, action) {
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
    toggleSaveBtn(!cityIsSaved)

    // Удаляем/сохраняем город в соответствии с cityIsSaved
    cityIsSaved
        ? removeCityItem(cityName)
        : createCityItem(cityName)
}

function toggleSaveBtn(cityIsSaved) {
    console.log('SaveBtn. CityIsSaved:', cityIsSaved)
    if (cityIsSaved) {
        UI.saveBtn.classList.add('_active')
    } else {
        UI.saveBtn.classList.remove('_active')
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
