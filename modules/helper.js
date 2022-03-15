import {MONTH} from "./variables.js";

export function convertToDate(date) {
    const dateUnix = new Date(date * 1000)
    const day = dateUnix.getDate()
    const monthNumber = dateUnix.getUTCMonth()
    const month = getMonth(monthNumber)
    return `${day} ${month}`
}

export function getMonth(date) {
    date = date.toString()
    return MONTH[date] || ''
}

// Баг 0:00
export function convertToTime(date) {
    const dateUnix = new Date(date * 1000)
    let minutes = dateUnix.getMinutes()
    let hours = dateUnix.getHours()
    minutes = minutes === 0 ? '00' : minutes
    if (hours < 10) {
        hours = `0${hours}`
    }
    return `${hours}:${minutes}`
}

export function tempConvert(tempKelvin) {
    const Kelvin = 273.15
    return Math.round(tempKelvin - Kelvin)
}