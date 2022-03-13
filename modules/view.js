import {currentWeatherData, forecastWeatherData} from './api.js'
import { UI } from "./variables.js"

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

function showWeather(weather, forecast) {
    const weatherData = currentWeatherData(weather);
    const forecastData = forecastWeatherData(forecast)
    console.log(forecastData)


    // NOW
    UI.tabNowCity.innerHTML = `${weatherData.City}`
    UI.tabNowTemp.innerHTML = `${weatherData.Temperature}&deg;C`
    UI.tabNowIcon.style.background = `url('https://openweathermap.org/img/wn/${weatherData.iconWeather}@2x.png') center center /contain no-repeat`

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

    // FORECAST
    UI.tabForecast.textContent = forecastData;
    let cityIsSaved = checkCity(weatherData.City)
    toggleSaveBtn(cityIsSaved)
}

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
    // toggleSaveBtn(false)
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
}
