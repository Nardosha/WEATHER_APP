import {getUrl, searchForm, getWeather } from "./modules/api.js";
import {tabContainer, toggleTab, saveBtn, cityList, handlerSavingCity, checkCity, toggleSaveBtn} from "./modules/view.js";

getDefaultCityWeather()

// Switch tabs
tabContainer.addEventListener('click', toggleTab)

// Show weather - tab "Now"
searchForm.onsubmit = function (e) {
    e.preventDefault()
    const inputValue = document.querySelector('.search-block__input').value
    const invalidCheck = /[().^+]/g

    if (inputValue.match(invalidCheck)) {
        alert('Incorrect city name')
        return
    }

    const cityName = inputValue.replace(/-/g, ' ')
    const url = getUrl(cityName)

    getWeather(url)

    let cityIsSaved = checkCity(cityName)
    toggleSaveBtn(cityIsSaved)
}

saveBtn.addEventListener('click', (e) => {
    handlerSavingCity()
})
cityList.addEventListener('click', (e) => {
    const city = e.target.closest('.locations-block__item').id
    if (e.target.classList.contains('locations-block__item-btn')) {

        handlerSavingCity(city)

    }
    if (e.target.classList.contains('locations-block__item-city')) {
        console.log('city', city)
        const url = getUrl(city)
        getWeather(url)
    }
})
function getDefaultCityWeather() {
    const defaultCity = 'Saint Petersburg'
    const defUrl = getUrl(defaultCity)
    getWeather(defUrl)
}



