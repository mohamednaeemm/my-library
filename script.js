document.addEventListener('DOMContentLoaded', () => {
    const books = [];

    const modal = document.getElementById('bookModal');
    const addBookButton = document.getElementById('addBookButton');
    const saveBookButton = document.getElementById('saveBookButton');
    const bookList = document.getElementById('bookList');
    const bookNameInput = document.getElementById('bookName');
    const bookCategoryInput = document.getElementById('bookCategory');

    addBookButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    saveBookButton.addEventListener('click', () => {
        const bookName = bookNameInput.value.trim();
        const bookCategory = bookCategoryInput.value.trim();

        if (bookName && bookCategory) {
            books.push({ name: bookName, category: bookCategory });
            renderBooks();
            modal.style.display = 'none';
            bookNameInput.value = '';
            bookCategoryInput.value = '';
        } else {
            alert('Please fill in all fields');
        }
    });

    function renderBooks() {
        bookList.innerHTML = '';
        books.forEach(book => {
            const bookItem = document.createElement('li');
            bookItem.textContent = `${book.name} - ${book.category}`;
            bookList.appendChild(bookItem);
        });
    }
});
class Library {
    constructor() {
        this.books = [];
        this.modal = document.getElementById('bookModal');
        this.addBookButton = document.getElementById('addBookButton');
        this.saveBookButton = document.getElementById('saveBookButton');
        this.bookList = document.getElementById('bookList');
        this.bookNameInput = document.getElementById('bookName');
        this.bookCategoryInput = document.getElementById('bookCategory');

        this.addBookButton.addEventListener('click', () => this.showModal());
        this.saveBookButton.addEventListener('click', () => this.saveBook());
    }

    showModal() {
        this.modal.style.display = 'block';
    }

    saveBook() {
        const bookName = this.bookNameInput.value.trim();
        const bookCategory = this.bookCategoryInput.value.trim();

        if (bookName && bookCategory) {
            this.books.push({ name: bookName, category: bookCategory });
            this.renderBooks();
            this.modal.style.display = 'none';
            this.bookNameInput.value = '';
            this.bookCategoryInput.value = '';
        } else {
            alert('Please fill in all fields');
        }
    }

    renderBooks() {
        this.bookList.innerHTML = '';
        this.books.forEach(book => {
            const bookItem = document.createElement('li');
            bookItem.textContent = `${book.name} - ${book.category}`;
            this.bookList.appendChild(bookItem);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Library();
});