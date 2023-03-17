const library = [];
const bookTable = document.getElementById('book-table');
const addBookButton = document.getElementById('add-book-button');
const formContainer = document.getElementsByClassName('form-container')[0];
const form = document.getElementsByTagName('form')[0];
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

// add functionality to the button
// I'll have to remove the tr it is contained in after being clicked
function removeBook() {
  console.log("I'm being removed!");
}

function createRemoveButton() {
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.classList.add('remove-book-button');
  removeButton.addEventListener('click', removeBook);
  return document.createElement('td').appendChild(removeButton);
}

function createBookTableRow(book) {
  const row = bookTable.insertRow();

  Object.keys(book).forEach((key) => {
    const cell = document.createElement('td');
    cell.textContent = book[key];
    row.appendChild(cell);
  });

  const lastCell = document.createElement('td');
  lastCell.appendChild(createRemoveButton());
  row.appendChild(lastCell);
}

function displayAllBooks() {
  library.forEach((item) => createBookTableRow(item));
}

function showFormContainer() {
  formContainer.classList.add('form-container--active');
}

function hideFormContainer() {
  formContainer.classList.remove('form-container--active');
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
  hideFormContainer();
}

form.addEventListener('submit', handleBookData);
addBookButton.addEventListener('click', showFormContainer);

displayAllBooks(library);
