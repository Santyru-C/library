const library = [];

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

const juancitoElAsesino = new Book('juancito', 'elasesitno', 20, true);
addBookToLibrary(juancitoElAsesino);
console.log(library);
