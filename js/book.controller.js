'use strict'

const EXPENSIVE_BOOKS_MIN_PRICE = 201
const AVERAGE_BOOKS_MIN_PRICE = 80
const AVERAGE_BOOKS_MAX_PRICE = 200
const CHEAP_BOOKS_MAX_PRICE = 79
const RATING = '<img src="./images/orange_star.png" class="rating-star">'

const gQueryOptions = _setQueryOptions()

var gAlertTimeoutId
var gCarToEdit = null

function onInit() {
    render(gQueryOptions)
}

function render(options) {
    var htmlStr = ''

    const books = getBooks(options)

    if (books.length === 0) htmlStr = '<tr><td colspan="4" class="no-books">No books to display</td></tr>'

    books.forEach(book => {
        htmlStr += `
        <tr>
            <td>${book.title} / <span class="author">${book.author}</span></td>
            <td>${_convertRating(book.rating)}</td>
            <td>${book.price}</td>
            <td>
                <button class="btn1 read-btn" onclick="onReadBook('${book.id}')">Read</button>
                <button class="btn1 update-btn" onclick="onUpdatePrice('${book.id}')">Update</button>
                <button class="btn1 delete-btn" onclick="onRemoveBook(event, '${book.id}')">Delete</button>
            </td>
        </tr>
        `
    })

    const elTable = document.querySelector('tbody.books-data')
    elTable.innerHTML = htmlStr

    renderFooter()
}

function renderFooter() {
    const defaultQueryOptions = _setQueryOptions()
    const updatedQueryOptions = defaultQueryOptions
    
    const elFooter = document.querySelector('footer')

    elFooter.querySelector('.total-books').textContent = getBooks(defaultQueryOptions).length
    
    deepMerge(updatedQueryOptions, {filterBy: {minPrice: EXPENSIVE_BOOKS_MIN_PRICE, maxPrice: Infinity}})
    elFooter.querySelector('.expensive-books').textContent = getBooks(updatedQueryOptions).length
    
    deepMerge(updatedQueryOptions, {filterBy: {minPrice: AVERAGE_BOOKS_MIN_PRICE, maxPrice: AVERAGE_BOOKS_MAX_PRICE}})
    elFooter.querySelector('.average-books').textContent = getBooks(updatedQueryOptions).length
    
    deepMerge(updatedQueryOptions, {filterBy: {minPrice: 0, maxPrice: CHEAP_BOOKS_MAX_PRICE}})
    elFooter.querySelector('.cheap-books').textContent = getBooks(updatedQueryOptions).length
}

function onAddBook(ev) {
    ev.preventDefault()

    const elNewBookTitle = document.querySelector('.add-book .book-title')
    const elNewBookPrice = document.querySelector('.add-book .book-price')

    if (elNewBookTitle.value === '') {
        showAlert('Cannot add an empty book', 'orange')
        return
    }

    addBook(elNewBookTitle.value, elNewBookPrice.value)
    showAlert(`The book ${elNewBookTitle.value} was added successfully`, 'green')
    render(gQueryOptions)
}

function onReadBook(bookId) {
    const book = readBook(bookId)

    const elBookModal = document.querySelector('.book-modal')
    elBookModal.querySelector('img').src = `./images/${book.imgUrl}`
    elBookModal.querySelector('.details h2').textContent = book.title
    elBookModal.querySelector('.details h3').textContent = book.author
    elBookModal.querySelector('.details .rating').innerHTML = `${_convertRating(book.rating)}`
    elBookModal.querySelector('.details .price').textContent = `Price: ${book.price} NIS`

    elBookModal.showModal()
}

function onUpdatePrice(bookId) {
    const price = +prompt('Enter the new price:')
    if (isNaN(price)) {
        alert('Please enter a number')
        return
    }

    updatePrice(bookId, price)
    showAlert('The price has been updated', 'green')
    render(gQueryOptions)
}

function onRemoveBook(ev, bookId) {
    ev.stopPropagation()

    removeBook(bookId)
    showAlert('The book has been deleted', 'red')
    render(gQueryOptions)
}

function onFilterBooks() {
    const title = getQueryFilterByTitle().value
    const minRating = +getQueryFilterByRating().value
    const filterBy = {
        filterBy: {
            title,
            minRating
        }
    }
    _updateQueryOptions(filterBy)
    render(gQueryOptions)
}

function onClearFilter() {
    getQueryFilterByTitle().value = ''
    getQueryFilterByRating().value = 0
    onFilterBooks()
}

function onSortBy() {
    const value = getQuerySortByValue().value
    const dir = +getQuerySortByDir().value

    gQueryOptions.sortBy = {}
    gQueryOptions.sortBy[value] = dir

    render(gQueryOptions)
}

function showAlert(text, alertType) {
    const alertTypes = ['green', 'orange', 'red']
    const alertClasses = ['green-alert', 'orange-alert', 'red-alert']
    const alertStatuses = [0, 0, 0]
    const typeIdx = alertTypes.findIndex(type => type === alertType)
    alertStatuses[typeIdx] = 1

    const elAlert = document.querySelector('.alert-modal')
    elAlert.textContent = text

    addRemoveElClasses(elAlert, alertClasses, alertStatuses)

    elAlert.classList.remove('hidden')

    clearTimeout(gAlertTimeoutId)
    gAlertTimeoutId = setTimeout(() => elAlert.classList.add('hidden'), 3000);
}

function addRemoveElClasses(el, classes, statuses) {
    classes.forEach((currClass, idx) => {
        if (statuses[idx] === 1 || statuses[idx] === true) el.classList.add(currClass)
        else el.classList.remove(currClass)
    })
}

function _setQueryOptions() {
    return {
        filterBy: {
            title: '',
            minRating: 0,
            minPrice: 0,
            maxPrice: Infinity
        },
        sortBy: {}
    }
}

function _updateQueryOptions(options = {}) {
    deepMerge(gQueryOptions, options)
}

function _convertRating(rating) {
    var ratingStr = ''
    for (var i = 0; i < rating; i++) {
        ratingStr += RATING
    }
    return ratingStr
}