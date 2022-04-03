import {getWeather} from "./modules/api.js";
import {toggleTab, handlerSavingCity} from "./modules/view.js";
import {UI, DEFAULT_CITY, SAVED_CITIES} from "./modules/variables.js"

getDefaultCityWeather()

UI.tabContainer.addEventListener('click', toggleTab)

UI.searchForm.onsubmit = function (e) {
    const cityName = getValueFromInput(e)
    handlerSavingCity(cityName, 'toggle')
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
        getWeather(city)
        handlerSavingCity(city, 'toggle')
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
    getWeather(cityName)
    UI.formInput.value = ''
    return cityName
}

function getDefaultCityWeather() {
    let citiesFromLocalStorage = Object.keys(localStorage)

    if (!citiesFromLocalStorage.length) {
        getWeather(DEFAULT_CITY)

        for (let city of SAVED_CITIES.keys()) {
            handlerSavingCity(city, 'default')
        }
        return
    }
    getWeather(citiesFromLocalStorage[0])

    SAVED_CITIES.clear()

    citiesFromLocalStorage.forEach(city => {
        SAVED_CITIES.set(city, city)
        handlerSavingCity(city, 'default')
    })
}



