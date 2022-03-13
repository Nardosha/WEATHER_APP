import {createObj} from './api.js'

const tabContainer = document.querySelector('.tabs__items')
const tabBlockContainer = document.querySelector('.tabs__content')
const saveBtn = document.querySelector('.tab-now_save')
const tabNowTemp = document.querySelector('.tab-now_temp')
const tabNowIcon = document.querySelector('.tab-now_icon')
const tabNowCity = document.querySelector('.tab-now_city-name')
const tabDetailsInfo = document.querySelector('.tab-details_info')
const cityList = document.querySelector('.locations-block__list')
let hideCity = document.getElementById(`hide`)


function toggleTab(e) {
    e.preventDefault()

    if (e.target.dataset) {
        const currentTab = e.target
        const currentTabAttribute = currentTab.dataset.tab
        const tabsBlock = Array.from(tabBlockContainer.children)
        const currentTabBlock = document.getElementById(`tab_${currentTabAttribute}`)
        const tabs = Array.from(tabContainer.children)

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

function showWeather(data) {
    const weatherData = createObj(data);

    // NOW
    tabNowCity.innerHTML = `${weatherData.City}`
    tabNowTemp.innerHTML = `${weatherData.Temperature}&deg;C`
    tabNowIcon.style.background = `url('https://openweathermap.org/img/wn/${weatherData.iconWeather}@2x.png') center center /contain no-repeat`

    // DETAILS
    const ulDetailsInfo = Array.from(tabDetailsInfo.children)
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
    let cityIsSaved = checkCity(weatherData.City)
    toggleSaveBtn(cityIsSaved)
}

// function handlerSavingCity(city) {
//     let cityName = city ? city : saveBtn.previousElementSibling.innerHTML
//     const cityIsSaved = checkCity(cityName);
//
//     if (!city) {
//         toggleSaveBtn(!cityIsSaved)
//     }
//
//     cityIsSaved
//         ? removeCityItem(cityName)
//         : createCityItem(cityName)
// }

function handlerSavingCity(city, action) {
    const currentCity = saveBtn.previousElementSibling.innerHTML
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
        saveBtn.classList.add('_active')
    } else {
        saveBtn.classList.remove('_active')
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
    let currentCity = hideCity.cloneNode(true)
    currentCity.id = `${city}`
    currentCity.querySelector('.locations-block__item-city').textContent = city
    cityList.append(currentCity)
    console.log(currentCity)
}

export {
    tabContainer,
    toggleTab,
    showWeather,
    saveBtn,
    cityList,
    handlerSavingCity,
    checkCity,
    toggleSaveBtn,
}

// const cityItem = document.createElement('li')
// const spanCity = document.createElement('span')
// const spanCBtn = document.createElement('span')
// cityItem.classList.add('locations-block__item')
// spanCity.classList.add('locations-block__item-city')
// spanCBtn.classList.add('locations-block__item-btn')