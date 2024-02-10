'use strict'

const STORAGE_BOOKS_KEY = 'booksDb'
const STORAGE_OPTIONS_KEY = 'options'

var gBooks

_createBooks()

function getBooks(options) {
    var cars = _filterBooks(options.filterBy)
    
    return cars
}

function addBook(title, price, imgUrl = '') {
    if (!title || title === '') return
    const book = _createBook(title, price, imgUrl)
    _saveBooksToStorage()

    return book
}

function readBook(bookId) {
    return gBooks.find(book => book.id === bookId)
}

function updatePrice(bookId, price) {
    const book = gBooks.find(book => book.id === bookId)
    book.price = price

    _saveBooksToStorage()

    return book
}

function removeBook(bookId) {
    const idx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(idx, 1)

    _saveBooksToStorage()
}

function _createBook(title, author, rating, price, imgUrl) {
    const newBook = {
        id: makeId(6),
        title,
        author,
        rating,
        price,
        imgUrl
    }
    gBooks.unshift(newBook)

    return newBook
}

function _createBooks() {
    gBooks = loadFromStorage(STORAGE_BOOKS_KEY)
    if (gBooks && gBooks.length) return

    gBooks = []
    _createBook('Harry Potter', 'J. K. Rolling', 4, 100, 'harry_potter.jpg')
    _createBook('Little women', 'Louisa May Alcott', 3, 70, 'little_women.jpg')
    _createBook('Flowers for Algernon', 'Daniel Keyes', 5, 85, 'flowers_for_algernon.jpg')

    _saveBooksToStorage()
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_BOOKS_KEY, gBooks)
}

function _filterBooks(filterBy) {
    const title = filterBy.title.toLowerCase()
    const minRating = filterBy.minRating
    const minPrice = filterBy.minPrice
    const maxPrice = filterBy.maxPrice
    
    return gBooks.filter(book => book.title.toLowerCase().includes(title)
                            && book.rating >= minRating
                            && book.price >= minPrice
                            && book.price <= maxPrice)
}