'use strict'

function getQueryFilterByTitle() {
    return document.querySelector('input.filter-by-title')
}

function getQueryFilterByRating() {
    return document.querySelector('select.filter-by-rating')
}

function getQuerySortByValue() {
    return document.querySelector('.sort-by')
}

function getQuerySortByDir() {
    return document.querySelector('input[name="sort-by"]:checked')
}

function getQueryAllSortByDirs() {
    return document.querySelectorAll('input[name="sort-by"]')
}

function getQueryBookModal() {
    return document.querySelector('.book-modal')
}