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
                <button class="btn1 read-btn">Read</button>
                <button class="btn1 update-btn">Update</button>
                <button class="btn1 delete-btn">Delete</button>
            </td>
        </tr>
        `
    })

    const elTable = document.querySelector('tbody.books-data')
    elTable.innerHTML = htmlStr
}