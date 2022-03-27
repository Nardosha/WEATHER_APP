import {getCurrentWeather} from "./modules/api.js";
import {toggleTab, handlerSavingCity} from "./modules/view.js";
import {UI, WEATHER_TYPE, DEFAULT_CITY, SAVED_CITIES} from "./modules/variables.js"

getDefaultCityWeather()

UI.tabContainer.addEventListener('click', toggleTab)

UI.searchForm.onsubmit = function (e) {
    const cityName = getValueFromInput(e)
    handlerSavingCity(cityName, 'set')
}

UI.saveBtn.addEventListener('click', (e) => {
    handlerSavingCity(UI.NOW_CITY.innerHTML)
})

UI.cityList.addEventListener('click', (e) => {
    const city = e.target.closest('.locations-block__item').id
    if (!city) return

    if (e.target.classList.contains('locations-block__item-btn')) {
        handlerSavingCity(city, 'remove')
    }
    if (e.target.classList.contains('locations-block__item-city')) {
        getCurrentWeather(city, WEATHER_TYPE.currentWeather)
        getCurrentWeather(city, WEATHER_TYPE.forecast)
        handlerSavingCity(city, 'set')
    }
})

function getValueFromInput(e) {
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
    return cityName
}

function getDefaultCityWeather() {
    let citiesFromLocalStorage = Object.keys(localStorage)

    if (!citiesFromLocalStorage.length) {
        getCurrentWeather(DEFAULT_CITY, WEATHER_TYPE.currentWeather)
        getCurrentWeather(DEFAULT_CITY, WEATHER_TYPE.forecast)

        for (let city in SAVED_CITIES) {
            handlerSavingCity(city, 'default')
        }
        return
    }

    getCurrentWeather(citiesFromLocalStorage[0], WEATHER_TYPE.currentWeather)
    getCurrentWeather(citiesFromLocalStorage[0], WEATHER_TYPE.forecast)

    for (let savedCity in SAVED_CITIES) {
        delete SAVED_CITIES[savedCity]
    }

    citiesFromLocalStorage.forEach(item => {
        SAVED_CITIES[item] = item
        handlerSavingCity(item, 'default')
    })
}



