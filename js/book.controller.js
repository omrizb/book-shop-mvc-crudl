'use strict'

var gAlertTimeoutId

function onInit() {
    setSearchInput()
    render()
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
}

function onAddBook(ev) {
    ev.preventDefault()

    const elNewBookTitle = document.querySelector('.add-book .book-title')
    const elNewBookPrice = document.querySelector('.add-book .book-price')

    addBook(elNewBookTitle.value, elNewBookPrice.value)
    showAlert(`The book ${elNewBookTitle.value} was added successfully`)
    render()
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
    showAlert('The price has been updated')
    render()
}

function onRemoveBook(ev, bookId) {
    ev.stopPropagation()

    removeBook(bookId)
    showAlert('The book has been deleted', false)
    render()
}

function onSearchBook(elSearchBook) {
    const searchStr = elSearchBook.value
    render({ filterBy: { title: searchStr } })
}

function onClearSearch() {
    const elSearchInput = _getQuerySearchInput()
    elSearchInput.value = ''
    render({ filterBy: { title: '' } })
}

function setSearchInput() {
    const elSearchInput = _getQuerySearchInput()
    elSearchInput.value = getSearchInput()
}

function showAlert(text, isGreen = true) {
    const elAlert = document.querySelector('.alert-modal')
    elAlert.textContent = text
    if (isGreen) {
        elAlert.classList.add('green-alert')
        elAlert.classList.remove('red-alert')
    } else {
        elAlert.classList.add('red-alert')
        elAlert.classList.remove('green-alert')
    }

    elAlert.classList.remove('hidden')

    clearTimeout(gAlertTimeoutId)
    gAlertTimeoutId = setTimeout(() => elAlert.classList.add('hidden'), 3000);
}

function _getQuerySearchInput() {
    return document.querySelector('input.search-book')
}