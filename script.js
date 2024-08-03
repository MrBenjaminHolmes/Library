function openForm() {
  document.getElementById('formContainer').classList.remove('notdisplayed');
  document.getElementById('formContainer').classList.add('displayed');
}

function closeForm() {
  document.getElementById('formContainer').classList.add('notdisplayed');
  document.getElementById('formContainer').classList.remove('displayed');
}