class BookManager {
    constructor() {
        // UI Elements
        this.closeButton = document.getElementById('close');
        this.modal = document.getElementById('bookModal');
        this.addBookButton = document.getElementById('addBookButton');
        this.saveBookButton = document.getElementById('saveBookButton');
        this.booksContainer = document.getElementById('booksContainer');
        this.bookNameInput = document.getElementById('bookName');
        this.bookCategoryInput = document.getElementById('bookCategory');
        this.bookAuthorInput = document.getElementById('author');
        this.readStatusInput = document.getElementById('readStatusBook');

        // Initialize event listeners
        this.initEventListeners();
        this.displayBooks();
    }

    initEventListeners() {
        this.addBookButton.addEventListener('click', () => this.showModal());
        this.closeButton.addEventListener('click', () => this.hideModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.hideModal();
        });
        this.saveBookButton.addEventListener('click', (event) => this.saveBook(event));
    }

    // Local Storage Operations
    getBooksFromStorage() {
        return JSON.parse(localStorage.getItem('books')) || [];
    }

    saveBooksToStorage(books) {
        localStorage.setItem('books', JSON.stringify(books));
    }

    addBookToStorage(book) {
        const books = this.getBooksFromStorage();
        books.push(book);
        this.saveBooksToStorage(books);
    }

    updateBookInStorage(updatedBook) {
        const books = this.getBooksFromStorage();
        const bookIndex = books.findIndex((book) => book.name === updatedBook.name);
        if (bookIndex !== -1) {
            books[bookIndex].readStatus = updatedBook.readStatus;
            this.saveBooksToStorage(books);
        }
    }

    removeBookFromStorage(bookName) {
        const books = this.getBooksFromStorage().filter((book) => book.name !== bookName);
        this.saveBooksToStorage(books);
    }

    // Modal Operations
    showModal() {
        this.modal.classList.add('show');
    }

    hideModal() {
        this.modal.classList.remove('show');
    }

    saveBook(event) {
        event.preventDefault();

        const bookName = this.bookNameInput.value.trim();
        if (this.isBookExists(bookName)) {
            alert('That Book already exists!');
            return;
        }

        const book = {
            name: bookName,
            author: this.bookAuthorInput.value.trim(),
            category: this.bookCategoryInput.value,
            readStatus: this.readStatusInput.options[this.readStatusInput.selectedIndex].textContent,
        };

        if (book.name && book.category) {
            this.booksContainer.appendChild(this.createBookCard(book));
            this.addBookToStorage(book);
            this.hideModal();
            this.resetForm();
        } else {
            alert('Please fill in all fields');
        }
    }

    resetForm() {
        this.bookNameInput.value = '';
        this.bookAuthorInput.value = '';
    }

    isBookExists(bookName) {
        return this.getBooksFromStorage().some((book) => book.name === bookName);
    }

    displayBooks() {
        const books = this.getBooksFromStorage();
        books.forEach((book) => {
            this.booksContainer.appendChild(this.createBookCard(book));
        });
    }

    // UI Updates
    createBookCard(book) {
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
        this.updateReadButtonStyle(readButton);

        readButton.addEventListener('click', () => {
            book.readStatus = book.readStatus === 'Already Read' ? 'Not Yet' : 'Already Read';
            readButton.textContent = book.readStatus;
            this.updateReadButtonStyle(readButton);
            this.updateBookInStorage(book);
        });

        buttonsContainer.appendChild(readButton);

        // Remove Button
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-book');
        removeButton.textContent = 'Remove';

        removeButton.addEventListener('click', () => {
            if (confirm('Are YOU Sure?')) {
                bookCard.remove();
                this.removeBookFromStorage(book.name);
            }
        });

        buttonsContainer.appendChild(removeButton);

        cardBody.appendChild(buttonsContainer);
        bookCard.appendChild(cardBody);

        return bookCard;
    }

    updateReadButtonStyle(button) {
        if (button.textContent === 'Already Read') {
            button.classList.add('read');
        } else {
            button.classList.remove('read');
        }
    }
}

// Initialize the BookManager
document.addEventListener('DOMContentLoaded', () => new BookManager());
