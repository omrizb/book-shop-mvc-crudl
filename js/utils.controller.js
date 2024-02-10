'use strict'

function deepMerge(target, source) {
    Object.keys(source).forEach(key => {
        if(source[key] && typeof(source[key]) === 'object') {
            target[key] = target[key] || {}
            deepMerge(target[key], source[key])
        } else target[key] = source[key]
    })
    return target
}