import {getUrl, getCurrentWeather } from "./modules/api.js";
import {toggleTab, handlerSavingCity, checkCity, toggleSaveBtn} from "./modules/view.js";
import { UI, WEATHER_TYPE } from "./modules/variables.js"

getDefaultCityWeather()

// Switch tabs
UI.tabContainer.addEventListener('click', toggleTab)

UI.searchForm.onsubmit = function (e) {
    e.preventDefault()
    const inputValue = document.querySelector('.search-block__input').value
    const invalidCheck = /[().^+]/g

    if (inputValue.match(invalidCheck)) {
        alert('Incorrect city name')
        return
    }

    const cityName = inputValue.replace(/-/g, ' ')
    const urlCurrentWeather = getUrl(cityName, WEATHER_TYPE.currentWeather)
    getCurrentWeather(urlCurrentWeather)

    let cityIsSaved = checkCity(cityName)
    toggleSaveBtn(cityIsSaved)
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
        const urlCurrentWeather = getUrl(city, WEATHER_TYPE.currentWeather)
        getCurrentWeather(urlCurrentWeather)
    }
})
function getDefaultCityWeather() {
    const defaultCity = 'Saint Petersburg'
    const defUrlCurrentWeather = getUrl(defaultCity, WEATHER_TYPE.currentWeather)
    getCurrentWeather(defUrlCurrentWeather)
}
