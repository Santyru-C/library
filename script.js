const bookTableBody = document.getElementById('book-table--body');
const form = document.getElementById('book-form');

const Library = {
  storage: [],

  addBook(book) {
    this.storage.push(book);
  },

  removeFromStorage(index) {
    delete this.storage[index];
    this.storage = this.storage.filter((el) => el != null); // remove empty indexes
  },

  checkIfAlreadyStored(newBook) {
    return this.storage.some((book) => book.title === newBook.title
    && book.author === newBook.author);
  },
};

function Book(title, author, pageNumber, read) {
  this.title = title;
  this.author = author;
  this.pageNumber = pageNumber;
  this.read = read;
}

/* DOM manipulation */
function setDataAttribute(row, book) {
  const bookIndex = Library.storage.indexOf(book);
  row.setAttribute('data-index', bookIndex.toString());
}

function getBookIndexFromRow(bookRow) {
  const indexFromRow = bookRow.getAttribute('data-index');
  return indexFromRow;
}

function removeBook() {
  const bookRow = this.parentNode.parentNode;
  Library.removeFromStorage(getBookIndexFromRow(bookRow));
  bookRow.remove();
}

function toggleReadStatus() {
  if (this.textContent === 'Yes') {
    this.textContent = 'No';
    Library.storage[getBookIndexFromRow(this.parentNode.parentNode)].read = 'No';
  } else {
    this.textContent = 'Yes';
    Library.storage[getBookIndexFromRow(this.parentNode.parentNode)].read = 'Yes';
  }
}

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

  if (!Library.checkIfAlreadyStored(newBook)) {
    Library.addBook(newBook);
    createBookTableRow(newBook);
  }

  this.reset();
}

function displayAllBooks() {
  Library.storage.forEach((item) => createBookTableRow(item));
}

form.addEventListener('submit', handleBookData);

const defaultBooks = [];
defaultBooks[0] = new Book('Don Quijote de la Mancha', 'Miguel de Cervantes', 1, 'Yes');
defaultBooks[1] = new Book('Moby-Dick', 'Herman Melville', 1, 'Yes');
defaultBooks[2] = new Book('Hamlet', 'William Shakespeare', 1, 'Yes');

defaultBooks.forEach((item) => Library.addBook(item));
displayAllBooks();
