'use strict'

function saveToStorage(key, val) {
    const valStr = JSON.stringify(val)
    localStorage.setItem(key, valStr)
}

function loadFromStorage(key) {
    const valStr = localStorage.getItem(key)
    return JSON.parse(valStr)
}