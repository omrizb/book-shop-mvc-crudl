'use strict'

const STORAGE_BOOKS_KEY = 'booksDb'
const STORAGE_OPTIONS_KEY = 'options'

var gBooks

_setDefaultOptions()
_createBooks()

function getBooks(options = {}) {
    const currOptions = _getOptions(options)

    var cars = _filterBooks(currOptions.filterBy)
    
    return cars
}

function addBook(title, price, imgUrl = '') {
    _createBook(title, price, imgUrl)
    _saveBooksToStorage()
}

function readBook(bookId) {
    return gBooks.find(book => book.id === bookId)
}

function updatePrice(bookId, price) {
    const book = gBooks.find(book => book.id === bookId)
    book.price = price

    _saveBooksToStorage()
}

function removeBook(bookId) {
    const idx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(idx, 1)

    _saveBooksToStorage()
}

function getSearchInput() {
    const options = loadFromStorage(STORAGE_OPTIONS_KEY)
    return options.filterBy.title
}

function _setDefaultOptions() {
    const currOptions = loadFromStorage(STORAGE_OPTIONS_KEY)
    if (currOptions) return

    const options = {
        filterBy: {
            title: '',
        }
    }
    saveToStorage(STORAGE_OPTIONS_KEY, options)
}

function _getOptions(options) {
    const totalOptions = loadFromStorage(STORAGE_OPTIONS_KEY)

    Object.keys(options).forEach(key => totalOptions[key] = options[key])

    saveToStorage(STORAGE_OPTIONS_KEY, totalOptions)

    return totalOptions
}

function _createBook(title, price, imgUrl) {
    const newBook = {
        id: makeId(6),
        title,
        price,
        imgUrl
    }
    gBooks.unshift(newBook)
}

function _createBooks() {
    gBooks = loadFromStorage(STORAGE_BOOKS_KEY)
    if (gBooks && gBooks.length) return

    gBooks = []
    _createBook('Harry Potter', 100, 'img1.jpeg')
    _createBook('Little women', 70, 'img2.jpeg')
    _createBook('Flowers for Algernon', 85, 'img3.jpeg')

    _saveBooksToStorage()
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_BOOKS_KEY, gBooks)
}

function _filterBooks(filterBy) {
    var title = filterBy.title.toLowerCase()
    
    return gBooks.filter(book => book.title.toLowerCase().includes(title))
}