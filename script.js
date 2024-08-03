function openForm() {
  document.getElementById('formContainer').classList.remove('notdisplayed');
  document.getElementById('formContainer').classList.add('displayed');
}

function closeForm() {
  document.getElementById('formContainer').classList.add('notdisplayed');
  document.getElementById('formContainer').classList.remove('displayed');
}


const myLibrary = [];

function Book(name,author,pages,img,status) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.img = img;
  this.status = status
}

function addBookToLibrary() {
  // do stuff here
}