export function setForecastWeather({day, time, temp, feels, icon, main}, container) {
    console.log({day, time, temp, feels, icon, main}, container)

    container.insertAdjacentHTML("beforeend", `<div class="tab-forecast__weather forecast-weather">
        <div class="forecast-weather__day">
            <div class="forecast-weather__day-month">${day}</div>
            <div class="forecast-weather__day-time">${time}</div>
        </div>
        <div class="forecast-weather__main">
            <div class="forecast-weather__main-temp">
                <div data-details="Temperature" class="forecast-weather__temp-celc">Temperature: ${temp}C</div>
                <div data-details="Feels like" class="forecast-weather__temp-feels">Feels like: ${feels}C</div>
            </div>
            <div class="forecast-weather__main-icon">
                <div class="forecast-weather__main-icon_name">${main}</div>
                <div class="forecast-weather__main-icon_icon"
                     style="background: url(${URL.ICON}${icon}@2x.png) center center /cover no-repeat"></div>
            </div>
        </div>
    </div>`
    )

}