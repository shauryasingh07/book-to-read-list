document.addEventListener("DOMContentLoaded", loadBooks);

let addBtn = document.getElementById("addBtn");
let bookTableBody = document.getElementById("bookTableBody");
let alertBox = document.getElementById("alert");

// Add book on button click
addBtn.addEventListener("click", function () {
    let title = document.getElementById("title").value.trim();
    let author = document.getElementById("author").value.trim();
    let isbn = document.getElementById("isbn").value.trim();

    if (title === "" || author === "" || isbn === "") {
        showAlert("Please fill all fields!", "error");
        return;
    }

    let book = { title, author, isbn };
    saveBookToLocalStorage(book);
    addBookToTable(book);
    showAlert("Book added successfully!", "success");

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
});

// Function to add book to table
function addBookToTable(book) {
    let row = document.createElement("tr");
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><button class="delete">X</button></td>
    `;

    bookTableBody.appendChild(row);

    row.querySelector(".delete").addEventListener("click", function () {
        removeBook(book);
        row.remove();
        showAlert("Book removed!", "error");
    });
}

// Save books to localStorage
function saveBookToLocalStorage(book) {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
}

// Load books from localStorage on page load
function loadBooks() {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books.forEach(book => addBookToTable(book));
}

// Remove book from localStorage
function removeBook(bookToRemove) {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books = books.filter(book => book.isbn !== bookToRemove.isbn);
    localStorage.setItem("books", JSON.stringify(books));
}

// Function to show alerts
function showAlert(message, type) {
    alertBox.innerText = message;
    alertBox.className = type;
    alertBox.style.visibility = "visible";
    alertBox.style.opacity = 1

    setTimeout(() => {
        alertBox.style.visibility = "hidden";
        alertBox.style.opacity = 0
    }, 2000);
}
