export function setItemToLocalStorage(key, city) {
    localStorage.setItem(city, key)
}

export function getItemFromLocalStorage(key) {
    localStorage.getItem(key)
}

export function removeItemFromLocalStorage(key) {
    localStorage.removeItem(key)
}

export function clearLocalStorage() {
    localStorage.clear()
}
