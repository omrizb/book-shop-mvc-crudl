'use strict'

const gQueryOptions = _setQueryOptions()

var gAlertTimeoutId
var gCarToEdit = null

function onInit() {
    render(gQueryOptions)
}

function render(options) {
    var htmlStr = ''

    const books = getBooks(options)

    books.forEach(book => {
        htmlStr += `
        <tr>
            <td>${book.title}</td>
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
    const elFooter = document.querySelector('footer')
    elFooter.querySelector('.total-books').textContent = getBooks(_setQueryOptions()).length
    elFooter.querySelector('.expensive-books').textContent = getBooks(_setQueryOptions({ minPrice: 201 })).length
    elFooter.querySelector('.average-books').textContent = getBooks(_setQueryOptions({ minPrice: 80, maxPrice: 200 })).length
    elFooter.querySelector('.cheap-books').textContent = getBooks(_setQueryOptions({ maxPrice: 79 })).length
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
    const bookStr = JSON.stringify(book, null, 4)

    const elBookModal = document.querySelector('.book-modal')
    const elBookTitle = elBookModal.querySelector('h2')
    const elBookDetails = elBookModal.querySelector('pre')

    elBookTitle.textContent = book.title
    elBookDetails.innerHTML = bookStr
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

function onSearchBook(elSearchBook) {
    const searchStr = elSearchBook.value
    render(_setQueryOptions({ title: searchStr }))
}

function onClearSearch() {
    const elSearchInput = _getQuerySearchInput()
    elSearchInput.value = ''
    render(_setQueryOptions({ title: '' }))
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

function _setQueryOptions({ title = '', minPrice = 0, maxPrice = Infinity } = {}) {
    return {
        filterBy: {
            title,
            minPrice,
            maxPrice
        }
    }
}

function _getQuerySearchInput() {
    return document.querySelector('input.search-book')
}