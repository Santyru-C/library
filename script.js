let library = [];

const bookTable = document.getElementById('book-table');
const addBookButton = document.getElementById('add-book-button');
const formContainer = document.getElementsByClassName('form-container')[0];
const form = document.getElementsByTagName('form')[0];

function Book(title, author, pageNumber, read) {
  this.title = title;
  this.author = author;
  this.pageNumber = pageNumber;
  this.read = read;
}

function addBookToLibrary(book) {
  library.push(book);
}

function removeFromList(bookRow) {
  const indexToRemove = bookRow.getAttribute('data-index');
  delete library[indexToRemove];
  library = library.filter((el) => el != null); // remove empty indexes
}

function removeBook() {
  const parentRow = this.parentNode.parentNode;
  removeFromList(parentRow);
  parentRow.remove();
}

function toggleReadStatus() {

}
// refactor next two functions into one
function createReadButton(value) {
  const readButton = document.createElement('button');
  readButton.textContent = value;
  readButton.classList.add('read-button');
  // removeButton.addEventListener('click', removeBook);

  return readButton;
}

function createRemoveButton() {
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.classList.add('remove-book-button');
  removeButton.addEventListener('click', removeBook);

  return removeButton;
}

function setDataAttribute(row, book) {
  const bookIndex = library.indexOf(book);
  row.setAttribute('data-index', bookIndex.toString());
}

function createBookTableRow(book) {
  const row = bookTable.insertRow();
  setDataAttribute(row, book);

  Object.keys(book).forEach((key) => {
    const cell = document.createElement('td');

    if (key !== 'read') {
      cell.textContent = book[key];
    } else {
      cell.appendChild(createReadButton(book[key]));
    }

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
