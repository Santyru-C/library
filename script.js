const library = [];
const mainContainer = document.getElementById('container');
const bookTable = document.getElementById('book-table');
const addBookButton = document.getElementById('add-book-button');
const bookForm = document.getElementsByClassName('form-container')[0];
const submitBookButton = document.getElementById('submit-book-button');
// create a book object constructor that has title, author, pages and read as properties

function Book(title, author, pageNumber, read) {
  this.title = title;
  this.author = author;
  this.pageNumber = pageNumber;
  this.read = read;
}

function addBookToLibrary(book) {
  library.push(book);
  console.log(book);
}

function createBookTableRow(book) {
  const row = bookTable.insertRow();

  Object.keys(book).forEach((key) => {
    const cell = document.createElement('td');
    cell.textContent = book[key];
    row.appendChild(cell);
  });
}

// add a function that adds all the book objects from library into html
// as new table rows
function displayAllBooks() {
  library.forEach((item) => createBookTableRow(item));
}

function showBookForm() {
  bookForm.classList.add('form-container--active');
}

function getBookFromInput(event) {
  event.preventDefault();
  const titleInput = document.getElementById('title-input').value;
  const authorInput = document.getElementById('author-input').value;
  const pagesInput = document.getElementById('pages-input').value;
  const readInput = document.getElementById('read-input').checked;

  newBook = new Book(titleInput, authorInput, pagesInput, readInput);

  addBookToLibrary(newBook);
  displayAllBooks();
}

submitBookButton.addEventListener('click', getBookFromInput);
addBookButton.addEventListener('click', showBookForm);

displayAllBooks(library);
