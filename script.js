function openForm() {
  document.getElementById('formContainer').classList.remove('notdisplayed');
  document.getElementById('formContainer').classList.add('displayed');
}

function closeForm() {
  document.getElementById('formContainer').classList.add('notdisplayed');
  document.getElementById('formContainer').classList.remove('displayed');
}

document.getElementById("submitBtn").addEventListener('click', function() {
  const name = document.getElementById('name').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;

  if (name && author && pages) {
    document.getElementById("newBook").submit();
    closeForm();
  }
});

const myLibrary = [];

function Book(name,author,pages,img,status) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.img = img;
  this.status = status
  myLibrary.push(this);
  displayBook();
}

const harryPotter = new Book("Harry Potter and the Sorcerer's Stone","J.K. Rowling",235,"https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_568,c_scale/jackets/9781408855652.jpg");


function displayBook(){
  const booksContainer = document.getElementById("bookGrid");
  booksContainer.innerHTML = '';

  myLibrary.forEach((book)=>{
      const bookDiv = document.createElement("div");
      bookDiv.classList.add("book");
      if(book.img.name === ""){
          book.img = "images/noCover.png";
      }
  

      bookDiv.innerHTML = `
            <img class="cover" src="${book.img}" alt="">
            <h2 class="bookTitle">${book.name}</h2>
            <p class="author">${book.author}</p>
            <p class="pages">${book.pages} Pages</p>
            <div class="menu">
                <button type="button" class="readButton"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z"/></svg>READ </button>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>trash-can-outline</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>
            </div>`;

        booksContainer.appendChild(bookDiv);

  })
}

const form = document.querySelector("form")

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const data = new FormData(form);
  const bookData = {};
  for (const [name, value] of data) {
    bookData[name] = value;
  }
  //console.log(bookData[0]);
  const bookObject = new Book(bookData.name,bookData.author,bookData.pages,bookData.coverImg,bookData.status);
  //console.table(myLibrary);
});
