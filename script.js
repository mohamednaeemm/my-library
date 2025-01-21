const close = document.getElementById('close');
const modal = document.getElementById('bookModal');
const addBookButton = document.getElementById('addBookButton');
const saveBookButton = document.getElementById('saveBookButton');
const bookList = document.getElementById('bookList');
const bookNameInput = document.getElementById('bookName');
const bookCategoryInput = document.getElementById('bookCategory');
const bookAuthor = document.getElementById('author');
const booksContainer = document.getElementById('booksContainer');
const removeBook = document.getElementById('remove-book');
const readStatusBook = document.getElementById('readStatusBook');

// Update the book in local storage
function updateBookInLocalStorage(updatedBook) {
    let booksFromStorage = JSON.parse(localStorage.getItem('books')) || [];

    const bookIndex = booksFromStorage.findIndex((book) => book.name === updatedBook.name);

    if (bookIndex !== -1) {
        booksFromStorage[bookIndex].readStatus = updatedBook.readStatus;

        localStorage.setItem('books', JSON.stringify(booksFromStorage));
    }
}

// Update the style of the read button based on the status
function updateReadButtonStyle(button) {
    if (button.textContent === 'Already Read') {
        button.classList.add('read');
    } else {
        button.classList.remove('read');
    }
}

function checkIfBookExists(book) {
    const booksFromStorage = getBooksFromStorage();
    return booksFromStorage.some((i) => i.name === book);
}

function removeBooksFromStorage(bookName) {
    let booksFromStorage = getBooksFromStorage();

    booksFromStorage = booksFromStorage.filter((i) => i.name !== bookName);
    console.log(bookName)
    console.log(booksFromStorage)

    localStorage.setItem('books', JSON.stringify(booksFromStorage));
}

function getBooksFromStorage() {
    let booksFromStorage;

    if(localStorage.getItem('books') === null) {
        booksFromStorage = []
    } else {
        booksFromStorage = JSON.parse(localStorage.getItem('books'));
    }

    return booksFromStorage;
}

function addBooksToStorage(book) {
    const booksFromStorage = getBooksFromStorage();

    booksFromStorage.push(book);

    localStorage.setItem('books', JSON.stringify(booksFromStorage));
}

document.addEventListener('DOMContentLoaded', displayBooks);



function displayBooks() {
    const booksFromStorage = getBooksFromStorage();
    booksFromStorage.forEach((book) => 
    booksContainer.appendChild(createBookCard(book))
);
}

addBookButton.addEventListener('click', () => {
    modal.classList.add('show');
});

close.addEventListener('click', () => {
    modal.classList.remove('show');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});
saveBookButton.addEventListener('click', (event) => {
    event.preventDefault();

    const bookName = bookNameInput.value.trim();

    // check if the book already exists
    if(checkIfBookExists(bookName)) {
        alert('That Book already exists!');
        return;
    }

    const author = bookAuthor.value.trim();
    const bookCategory = bookCategoryInput.value;
    const readStatus = readStatusBook.options[readStatusBook.selectedIndex].textContent;

    if (bookName && bookCategory) {
        const book = { name: bookName, author: author, category: bookCategory, readStatus: readStatus };
        const newBookCard = createBookCard(book);
        booksContainer.appendChild(newBookCard);
        addBooksToStorage(book)   
        modal.classList.remove('show');
        bookNameInput.value = '';
        bookAuthor.value = '';
    } else {
        alert('Please fill in all fields');
    }
});



function createBookCard(book) {
    // Create the card container
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    
    const title = document.createElement('h2');
    title.textContent = book.name;
    bookCard.appendChild(title);
    
    const cardBody = document.createElement('div');
    cardBody.classList.add('book-card-body');
    
    if (book.author) {
        const authorInfo = document.createElement('p');
        authorInfo.innerHTML = `Author: <span>${book.author}</span>`;
        cardBody.appendChild(authorInfo);
    }
    
    const categoryInfo = document.createElement('p');
    categoryInfo.innerHTML = `Category: <span>${book.category}</span>`;
    cardBody.appendChild(categoryInfo);
    
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('book-card-buttons');
    
    // Read Status Button
    const readButton = document.createElement('button');
    readButton.classList.add('read-status');
    readButton.textContent = book.readStatus;
    updateReadButtonStyle(readButton);
    
    readButton.addEventListener('click', () => {
        // Toggle the read status
        book.readStatus = book.readStatus === 'Already Read' ? 'Not Yet' : 'Already Read';
        readButton.textContent = book.readStatus;
        updateReadButtonStyle(readButton);

        // Update the book in local storage
        updateBookInLocalStorage(book);
    });
    
    buttonsContainer.appendChild(readButton);
    
    // Remove Button
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-book');
    removeButton.textContent = 'Remove';
    
    removeButton.addEventListener('click', () => {
        if(confirm("Are YOU Sure?")) {
            // Remove from the DOM
            bookCard.remove();

            // Remove from the LocalStorage
            removeBooksFromStorage(book.name)
        }
    });
    
    buttonsContainer.appendChild(removeButton);
    
    cardBody.appendChild(buttonsContainer);
    
    bookCard.appendChild(cardBody);
    return bookCard;
}



