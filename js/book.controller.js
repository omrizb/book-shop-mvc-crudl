'use strict'

function onInit() {
    render()
}

function render() {
    var htmlStr = ''
    var books = getBooks()
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
    render()
}

function onRemoveBook(ev, bookId) {
    ev.stopPropagation()
    
    removeBook(bookId)
    render()
}