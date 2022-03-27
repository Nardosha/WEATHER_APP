import {SAVED_CITIES, UI, WEATHER_TYPE} from "./variables.js";
import {removeItemFromLocalStorage, setItemToLocalStorage} from "./localStorage.js";
import {getCurrentWeather} from "./api.js";
import {handlerSavingCity} from "./view.js";

function checkCity(cityName) {
    return SAVED_CITIES.hasOwnProperty(cityName);
}

function toggleSaveBtn(cityIsSaved, cityName) {
    if (cityIsSaved) {
        UI.saveBtn.classList.add('_active')
        return true
    } else {
        UI.saveBtn.classList.remove('_active')
        return false
    }
}

function deleteCity(cityName) {
    document.getElementById(`${cityName}`).remove()
    delete SAVED_CITIES[cityName]
    removeItemFromLocalStorage(cityName)
}

function createCityItem(cityName) {
    let currentCity = UI.hideCity.cloneNode(true)
    currentCity.id = `${cityName}`
    currentCity.querySelector('.locations-block__item-city').textContent = cityName
    UI.cityList.append(currentCity)
}

function addCityToSavedCities(cityName) {
    SAVED_CITIES[cityName] = cityName
    setItemToLocalStorage(cityName, cityName)
}

function getNextCity() {
    if (!Object.keys(SAVED_CITIES).length) return

    const nextCity = document.querySelector('.locations-block__item').nextElementSibling.id
    getCurrentWeather(nextCity, WEATHER_TYPE.currentWeather)
    getCurrentWeather(nextCity, WEATHER_TYPE.forecast)
    handlerSavingCity(nextCity, 'set')
}

export {
    checkCity,
    toggleSaveBtn,
    deleteCity,
    createCityItem,
    addCityToSavedCities,
    getNextCity,
}