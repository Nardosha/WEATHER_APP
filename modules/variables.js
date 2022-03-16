export const UI = {
    tabContainer: document.querySelector('.tabs__items'),
    tabBlockContainer: document.querySelector('.tabs__content'),
    saveBtn: document.querySelector('.tab-now_save'),

    cityList: document.querySelector('.locations-block__list'),
    formInput: document.querySelector('.search-block__input'),
    searchForm: document.querySelector('.search-block__form'),
    hideCity: document.getElementById(`hide`),

    // Now
    NOW_CITY: document.querySelector('.tab-now_city-name'),
    NOW_TEMP: document.querySelector('.tab-now_temp'),
    NOW_ICON: document.querySelector('.tab-now_icon'),

    // Details
    tabDetailsWrapper: document.querySelector('.tab-details__wrapper'),
    DETAILS_CITY: document.querySelector('.tab-details__info-city'),
    DETAILS_TEMP: document.querySelector('.tab-details__info-temp'),
    DETAILS_FEELS: document.querySelector('.tab-details__info-feels'),
    DETAILS_WEATHER: document.querySelector('.tab-details__info-weather'),
    DETAILS_SUNRISE: document.querySelector('.tab-details__info-sunrise'),
    DETAILS_SUNSET: document.querySelector('.tab-details__info-sunset'),


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

export const WEATHER_TYPE = {
    currentWeather: 'weather',
    forecast: 'forecast',
}

export const DEFAULT_CITY = 'Saint Petersburg'

export const URL = {
    ICON: `https://openweathermap.org/img/wn/`
}

export const FORECAST_LIST_LENGTH = 8