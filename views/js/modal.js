// Get modal element
const modal = document.getElementById("simpleModal");

// Get open modal button
const modalBtn = document.querySelector(".createButton");

// Get close modal button
const closeBtn = document.querySelector(".closeBtn");

// Get board submit button
const createBtn = document.getElementById("submit-board");

[openModal, showTeams, showUsers].forEach(f => {
  modalBtn.addEventListener("click", f);
});

// Listen for close click
closeBtn.addEventListener("click", closeModal);

// Listen for submit
createBtn.addEventListener("click", createBoard);

// Close on outside click
window.addEventListener("click", clickOutside);

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

function clickOutside(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}
