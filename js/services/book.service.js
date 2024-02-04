'use strict'

const gBooks = [
    { id: makeId(6), title: 'Harry Potter', price: 100, imgUrl: 'img1.jpeg' },
    { id: makeId(6), title: 'Little women', price: 70, imgUrl: 'img2.jpeg' },
    { id: makeId(6), title: 'Flowers for Algernon', price: 85, imgUrl: 'img3.jpeg' },
]

function getBooks() {
    return gBooks
}

function addBook(title, price, imgUrl='') {
    _createBook(title, price, imgUrl)
}

function  updatePrice(bookId, price) {
    const book = gBooks.find(book => book.id === bookId)
    book.price = price
}

function removeBook(bookId) {
    const idx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(idx, 1)
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