export const UI = {
    tabContainer: document.querySelector('.tabs__items'),
    tabBlockContainer: document.querySelector('.tabs__content'),
    saveBtn: document.querySelector('.tab-now_save'),
    tabNowTemp: document.querySelector('.tab-now_temp'),
    tabNowIcon: document.querySelector('.tab-now_icon'),
    tabNowCity: document.querySelector('.tab-now_city-name'),
    tabDetailsInfo: document.querySelector('.tab-details_info'),
    cityList: document.querySelector('.locations-block__list'),
    hideCity: document.getElementById(`hide`),
    tabForecast: document.querySelector('.tab-details_temp'),
    inputValue: document.querySelector('.search-block__input'),
    searchForm: document.querySelector('.search-block__form'),
}

export const MONTH = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
}

export const WEATHER_TYPE = {
    currentWeather: 'weather',
    forecast: 'forecast',
}