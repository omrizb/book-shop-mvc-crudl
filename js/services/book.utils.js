'use strict'

function makeId(length) {
    var id = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        id += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return id
}

function isObjEmpty(obj) {
    return Object.keys(obj).length === 0
}