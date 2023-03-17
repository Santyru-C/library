const library = [];
const bookTable = document.getElementById('book-table');
const addBookButton = document.getElementById('add-book-button');
const bookForm = document.getElementsByClassName('form-container')[0];
// create a book object constructor that has title, author, pages and read as properties

function Book(title, author, pageNumber, read) {
  this.title = title;
  this.author = author;
  this.pageNumber = pageNumber;
  this.read = read;
}

function addBookToLibrary(book) {
  library.push(book);
}

function createBookTableRow(book) {
  const row = bookTable.insertRow();

  Object.keys(book).forEach((key) => {
    const cell = document.createElement('td');
    cell.textContent = book[key];
    row.appendChild(cell);
  });
}

function displayAllBooks() {
  library.forEach((item) => createBookTableRow(item));
}

function showBookForm() {
  bookForm.classList.add('form-container--active');
}

function hideBookForm() {
  bookForm.classList.remove('form-container--active');
}

function createBookFromInput() {
  const titleInput = document.getElementById('title-input').value;
  const authorInput = document.getElementById('author-input').value;
  const pagesInput = document.getElementById('pages-input').value;
  const readInput = (document.getElementById('read-input').checked) ? 'Yes' : 'No';

  return new Book(titleInput, authorInput, pagesInput, readInput);
}

function handleBookData(event) {
  event.preventDefault();
  const newBook = createBookFromInput();

  // check if book is already in library

  addBookToLibrary(newBook);
  createBookTableRow(newBook);

  this.reset();
  hideBookForm();
}

const form = document.getElementsByTagName('form')[0];
form.addEventListener('submit', handleBookData);
addBookButton.addEventListener('click', showBookForm);

displayAllBooks(library);
