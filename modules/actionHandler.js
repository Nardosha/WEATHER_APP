import {SAVED_CITIES, UI, WEATHER_TYPE} from "./variables.js";
import {removeItemFromLocalStorage, setItemToLocalStorage} from "./localStorage.js";
import {getWeather} from "./api.js";
import {handlerSavingCity} from "./view.js";

function checkCity(cityName) {
    return SAVED_CITIES.has(cityName)
}

function toggleSaveBtn(cityIsSaved) {
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
    SAVED_CITIES.delete(cityName)
    removeItemFromLocalStorage(cityName)
}

function createCityItem(cityName) {
    let currentCity = UI.hideCity.cloneNode(true)
    currentCity.id = `${cityName}`
    currentCity.querySelector('.locations-block__item-city').textContent = cityName
    UI.cityList.append(currentCity)
}

function addCityToSavedCities(cityName) {
    SAVED_CITIES.set(cityName, cityName)
    setItemToLocalStorage(cityName, cityName)
}

function getNextCity() {
    if (!SAVED_CITIES.size) return

    const nextCity = document.querySelector('.locations-block__item').nextElementSibling.id
    getWeather(nextCity, WEATHER_TYPE.currentWeather)
    getWeather(nextCity, WEATHER_TYPE.forecast)
    handlerSavingCity(nextCity, 'toggle')
}

export {
    checkCity,
    toggleSaveBtn,
    deleteCity,
    createCityItem,
    addCityToSavedCities,
    getNextCity,
}