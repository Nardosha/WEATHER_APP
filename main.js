import { getCurrentWeather } from "./modules/api.js";
import {toggleTab, handlerSavingCity, checkCity, toggleSaveBtn} from "./modules/view.js";
import { UI, WEATHER_TYPE, DEFAULT_CITY } from "./modules/variables.js"

getDefaultCityWeather()

// Switch tabs
UI.tabContainer.addEventListener('click', toggleTab)

UI.searchForm.onsubmit = function (e) {
    e.preventDefault()
    let inputValue = UI.formInput.value
    const invalidCheck = /[().^+]/g

    if (inputValue.match(invalidCheck)) {
        alert('Incorrect city name')
        return
    }

    const cityName = inputValue.replace(/-/g, ' ')
    getCurrentWeather(cityName, WEATHER_TYPE.currentWeather)
    getCurrentWeather(cityName, WEATHER_TYPE.forecast)
    UI.formInput.value = ''

    let cityIsSaved = checkCity(cityName)
    toggleSaveBtn(cityIsSaved, cityName)
}

UI.saveBtn.addEventListener('click', (e) => {
    handlerSavingCity()
})

UI.cityList.addEventListener('click', (e) => {
    const city = e.target.closest('.locations-block__item').id

    if (e.target.classList.contains('locations-block__item-btn')) {
        handlerSavingCity(city)
    }
    if (e.target.classList.contains('locations-block__item-city')) {
        console.log('city', city)
        getCurrentWeather(city, WEATHER_TYPE.currentWeather)
        getCurrentWeather(city, WEATHER_TYPE.forecast)
    }
})
function getDefaultCityWeather() {
    getCurrentWeather(DEFAULT_CITY, WEATHER_TYPE.currentWeather)
    getCurrentWeather(DEFAULT_CITY, WEATHER_TYPE.forecast)
}
