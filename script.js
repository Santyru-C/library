const library = [];
const bookTable = document.getElementById('book-table');

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

// add a function that adds all the book objects from library into html
// as new table rows
function loopThroughList(list) {
  for (const element of list) {
    console.log(element);
  }
}

function addBookToTable() {
  return NaN;
}

// function that creates a new table row with Book object information as td
function createBookTableRow(book) {
  const row = bookTable.insertRow();

  Object.keys(book).forEach((key) => {
    const cell = document.createElement('td');
    cell.textContent = book[key];
    row.appendChild(cell);
  });
}

const testBook = new Book('title1', 'author1', 1, true);
createBookTableRow(testBook);
