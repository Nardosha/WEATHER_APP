export const UI = {
    tabContainer: document.querySelector('.tabs__items'),
    tabBlockContainer: document.querySelector('.tabs__content'),
    saveBtn: document.querySelector('.tab-now_save'),
    tabNowTemp: document.querySelector('.tab-now_temp'),
    tabNowIcon: document.querySelector('.tab-now_icon'),
    tabNowCity: document.querySelector('.tab-now_city-name'),
    tabDetailsInfo: document.querySelector('.tab-details_info'),
    cityList: document.querySelector('.locations-block__list'),
    tabForecast: document.querySelector('.tab-details_temp'),
    formInput: document.querySelector('.search-block__input'),
    searchForm: document.querySelector('.search-block__form'),
    hideCity: document.getElementById(`hide`),

    // Forecast
    tabForecastList: document.querySelector('.tab-forecast'),
    tabForecastContainer: document.querySelector('.tab-forecast__wrapper'),
    tabForecastWeather: document.querySelector('.tab-forecast__weather'),
    tabForecastCity: document.querySelector('.tab-forecast__city'),
    tabForecastDay: document.querySelector('.forecast-weather__day-month'),
    tabForecastTime: document.querySelector('.forecast-weather__day-time'),
    tabForecastTemp: document.querySelector('.forecast-weather__temp-celc'),
    tabForecastFeels: document.querySelector('.forecast-weather__temp-feels'),
    tabForecastMain: document.querySelector('.forecast-weather__main-icon_name'),
    tabForecastIcon: document.querySelector('.forecast-weather__main-icon_icon'),
}

export const MONTH = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
}

export const WEATHER_TYPE = {
    currentWeather: 'weather',
    forecast: 'forecast',
}

export const DEFAULT_CITY = 'Saint Petersburg'

export const URL = {
    ICON: `https://openweathermap.org/img/wn/`
}

export const FORECAST_LIST_LENGTH = 8