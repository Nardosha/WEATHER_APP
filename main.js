import {getUrl, searchForm, showWeather,} from "./modules/api.js";
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

    fetch(url)
        .then(response => response.json())
        .then(response => new Promise((res, rej) => {
            if (response.cod >= 400) {
                rej(alert(`Status 404. City not found!`))
            }
            res(showWeather(response))
        }))
        .catch(err => {
            if (err.name === 'TypeError') {
                console.log(err)
                alert('Error! Try again later!')
            }
        })
}