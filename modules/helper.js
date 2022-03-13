import {MONTH} from "./variables.js";

export function convertToDate(date) {
    const dateUnix = new Date(date)
    const day = dateUnix.getDate()
    const monthNumber = dateUnix.getUTCMonth()
    const month = getMonth(monthNumber)
    return `${day} ${month}`
}

export function getMonth(date) {
    date = date.toString()
    for (let key in MONTH) {
        if (key === date) {
            return MONTH[key]
        }
    }
}

export function convertToTime(date) {
    const dateUnix = new Date(date * 1000)
    let minutes = dateUnix.getMinutes()
    minutes = minutes === 0 ? '00' : minutes
    let hours = dateUnix.getHours()
    return `${hours}:${minutes}`
}

export function tempConvert(tempKelvin) {
    const Kelvin = 273.15
    return Math.round(tempKelvin - Kelvin)
}