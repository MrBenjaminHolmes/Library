function openForm() {
  document.getElementById("formContainer").classList.remove("notdisplayed");
  document.getElementById("formContainer").classList.add("displayed");
}

function closeForm() {
  document.getElementById("formContainer").classList.add("notdisplayed");
  document.getElementById("formContainer").classList.remove("displayed");
}

document.getElementById("submitBtn").addEventListener("click", function() {
  const name = document.getElementById("name").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;

  if (name && author && pages) {
    document.getElementById("newBook").submit();
    closeForm();
  }
});

const myLibrary = [];

function Book(name, author, pages, img, status) {
  this.id = myLibrary.length;
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.img = img;
  this.status = status;
  myLibrary.push(this);
  displayBook();
}

function displayBook() {
  const booksContainer = document.getElementById("bookGrid");

  booksContainer.innerHTML = "";

  myLibrary.forEach((book) => {
    console.table(myLibrary);
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.innerHTML = `
      <img class="cover" src="${book.img}" alt="">
      <h2 class="bookTitle">${book.name}</h2>
      <p class="author">${book.author}</p>
      <p class="pages">${book.pages} Pages</p>
      <div class="menu">
        <button type="button" class="readButton ${book.status}" id="read-${book.id}">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z"/></svg>
          <span>${book.status === "on" ? "READ" : "UNREAD"}</span>
        </button>
        <svg id="${book.id}" class="bin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>trash-can-outline</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>
      </div>`;
    booksContainer.appendChild(bookDiv);
  });

  addEventListenersToBooks();
  addReadButtonListeners();
}


function addEventListenersToBooks() {
  const binBtns = document.querySelectorAll(".menu > .bin");

  binBtns.forEach(button => {
    button.addEventListener("click", function() {
      const index = myLibrary.findIndex(book => book.id == button.id);
      if (index > -1) { 
        myLibrary.splice(index, 1); 
        displayBook();
      }
    });
  });
}

function addReadButtonListeners() {
  const readBtns = document.querySelectorAll(".menu > .readButton");

  readBtns.forEach(button => {
    button.addEventListener("click", function() {
      const id = parseInt(button.id.replace('read-', ''));
      const book = myLibrary.find(book => book.id === id);

      if (book) {
        const span = button.querySelector("span");
        if (book.status === "off") {
          book.status = "on";
          button.classList.remove("off");
          button.classList.add("on");
          span.textContent = "READ";
        } else {
          book.status = "off";
          button.classList.remove("on");
          button.classList.add("off");
          span.textContent = "UNREAD";
        }
      }
    });
  });
}


const form = document.querySelector("form");

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const data = new FormData(form);
  const bookData = {};
  for (const [name, value] of data.entries()) {
    bookData[name] = value;
  }

  const fileInput = document.getElementById("coverImg");
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const imgURL = event.target.result;
      new Book(bookData.name, bookData.author, bookData.pages, imgURL, bookData.status);
    };
    reader.readAsDataURL(file);
  } else {
    if (bookData.status === undefined) {
      new Book(bookData.name, bookData.author, bookData.pages, "/images/noCover.png", "off");
    } else {
      new Book(bookData.name, bookData.author, bookData.pages, "/images/noCover.png", bookData.status);
    }
  }
  form.reset();
});

displayBook();
