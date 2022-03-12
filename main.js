import {getUrl, searchForm, showWeather, getWeather} from "./modules/api.js";
import {tabContainer, toggleTab} from "./modules/view.js";

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
}

