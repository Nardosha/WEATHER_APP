export function setItemToLocalStorage(key, city) {
    localStorage.setItem(key, city)
}

export function getItemFromLocalStorage(key) {
   return localStorage.getItem(key)
}

export function removeItemFromLocalStorage(key) {
    localStorage.removeItem(key)
}

export function clearLocalStorage() {
    localStorage.clear()
}
