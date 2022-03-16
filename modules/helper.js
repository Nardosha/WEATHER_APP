export function convertToTime(date) {
    return new Date(date * 1000).toLocaleTimeString('en-GB', {
        hour: "numeric",
        minute: "numeric",
    })
}

export function convertToDate(date) {
    return new Date(date * 1000).toLocaleDateString('en-GB', {
        day: "2-digit",
        month: "long",
    })
}

export function tempConvert(tempKelvin) {
    const Kelvin = 273.15
    return Math.round(tempKelvin - Kelvin)
}

export function getWeatherNowFromJson(data) {
    console.log(data)
    let {
        name,
        main: {
            temp,
            feels_like: feels,

        },
        weather: [{
            main,
            icon,
        }],
        sys: {
            sunrise,
            sunset,
        },

    } = data

    return {
        name,
        temp: tempConvert(temp),
        feels: tempConvert(feels),
        main,
        icon,
        sunrise: convertToTime(sunrise),
        sunset: convertToTime(sunset),
    }
}

export function getWeatherForecastFromJson(data) {
    let {
        dt,
        main: {
            temp,
            feels_like,
        },
        weather: [{
            main,
            icon,
        }
        ]
    }
        = data

    // temp = tempConvert(temp)
    // const feels = tempConvert(feels_like)
    // const day = convertToDate(dt)
    // const time = convertToTime(dt)

    return {
        temp: tempConvert(temp),
        feels: tempConvert(feels_like),
        icon,
        main,
        day: convertToDate(dt),
        time: convertToTime(dt),
    }
}
