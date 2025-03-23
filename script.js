document.addEventListener("DOMContentLoaded", function () {
    var popupoverlay = document.querySelector(".popup-overlay");
    var boxpopup = document.querySelector(".box-popup");
    var addpopupbutton = document.getElementById("add-popup-button");
    var popupcancel = document.getElementById("popup-cancel");
    var container = document.querySelector(".container");
    var addbook = document.getElementById("add-book");
    var booktitleinput = document.getElementById("book-title-input");
    var bookauthorinput = document.getElementById("book-author-input");
    var bookdescription = document.getElementById("book-description");

    // Function to Load Books from Local Storage
    function loadBooks() {
        var books = JSON.parse(localStorage.getItem("books")) || [];
        container.innerHTML = ""; // Clear container before adding books

        books.forEach(function (book, index) {
            addBookToDOM(book.title, book.author, book.description, index);
        });
    }

    // Function to Add Book to DOM
    function addBookToDOM(title, author, description, index) {
        var div = document.createElement("div");
        div.setAttribute("class", "book-container");
        div.innerHTML = `
            <h2>${title}</h2>
            <h5>${author}</h5>
            <p>${description}</p>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;

        // Append to Container
        container.appendChild(div);
        booktitleinput.value="" 
        bookauthorinput.value=""  
        bookdescription.value=""
        

        // Add Delete Functionality
        div.querySelector(".delete-btn").addEventListener("click", function () {
            deleteBook(index);
        });
    }

    // Function to Save Books to Local Storage
    function saveBook(title, author, description) {
        var books = JSON.parse(localStorage.getItem("books")) || [];
        books.push({ title, author, description });
        localStorage.setItem("books", JSON.stringify(books));
        loadBooks(); // Refresh UI
    }

    // Function to Delete Book from Storage
    function deleteBook(index) {
        var books = JSON.parse(localStorage.getItem("books")) || [];
        books.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books));
        loadBooks(); // Refresh UI
    }

    // Show Popup
    if (addpopupbutton) {
        addpopupbutton.addEventListener("click", function () {
            popupoverlay.style.display = "block";
            boxpopup.style.display = "block";
        });
    }

    // Close Popup
    if (popupcancel) {
        popupcancel.addEventListener("click", function (event) {
            event.preventDefault();
            popupoverlay.style.display = "none";
            boxpopup.style.display = "none";
        });
    }

    // Add Book Event
    if (addbook) {
        addbook.addEventListener("click", function () {
            var title = booktitleinput.value.trim();
            var author = bookauthorinput.value.trim();
            var description = bookdescription.value.trim();

            if (title === "" || author === "" || description === "") {
                alert("Please fill in all fields.");
                return;
            }

            saveBook(title, author, description);

            // Close popup & clear fields
            popupoverlay.style.display = "none";
            boxpopup.style.display = "none";
            
        });
    }

    // Load Books on Page Load
    loadBooks();
});
