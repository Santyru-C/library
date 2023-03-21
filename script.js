let library = [];

const bookTableBody = document.getElementById('book-table--body');
const form = document.getElementById('book-form');

function Book(title, author, pageNumber, read) {
  this.title = title;
  this.author = author;
  this.pageNumber = pageNumber;
  this.read = read;
}

function addBookToLibrary(book) {
  library.push(book);
}

function getBookIndexFromRow(bookRow) {
  const indexFromRow = bookRow.getAttribute('data-index');
  return indexFromRow;
}

function removeFromList(indexToRemove) {
  delete library[indexToRemove];
  library = library.filter((el) => el != null); // remove empty indexes
}

function removeBook() {
  const bookRow = this.parentNode.parentNode;
  removeFromList(getBookIndexFromRow(bookRow));
  bookRow.remove();
}

function toggleReadStatus() {
  if (this.textContent === 'Yes') {
    this.textContent = 'No';
    library[getBookIndexFromRow(this.parentNode.parentNode)].read = 'No';
  } else {
    this.textContent = 'Yes';
    library[getBookIndexFromRow(this.parentNode.parentNode)].read = 'Yes';
  }
}

// refactor next two functions into one
function createReadButton(value) {
  const readButton = document.createElement('button');
  readButton.textContent = value;
  readButton.classList.add('read-button');
  readButton.addEventListener('click', toggleReadStatus);

  return readButton;
}

function createRemoveButton() {
  const removeButton = document.createElement('button');
  const img = document.createElement('img');
  img.setAttribute('src', './svg/trash-can-outline.svg');
  removeButton.appendChild(img);
  removeButton.classList.add('remove-book-button');
  removeButton.addEventListener('click', removeBook);

  return removeButton;
}

function setDataAttribute(row, book) {
  const bookIndex = library.indexOf(book);
  row.setAttribute('data-index', bookIndex.toString());
}

function createBookTableRow(book) {
  const row = bookTableBody.insertRow();
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
}

form.addEventListener('submit', handleBookData);

const default1 = new Book('Don Quijote de la Mancha', 'Miguel de Cervantes', 1, 'Yes');
const default2 = new Book('Moby-Dick', 'Herman Melville', 1, 'Yes');
const default3 = new Book('Hamlet', 'William Shakespeare', 1, 'Yes');

addBookToLibrary(default1);
addBookToLibrary(default2);
addBookToLibrary(default3);
displayAllBooks(library);
