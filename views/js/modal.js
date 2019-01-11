// Get modal element
const modal = document.getElementById("simpleModal");

// Get open modal button
const modalBtn = document.querySelector(".createButton");

// Get close modal button
const closeBtn = document.querySelector(".closeBtn");

// Listen for open click
modalBtn.addEventListener("click", openModal);
modalBtn.addEventListener("click", showTeams);
modalBtn.addEventListener("click", showUsers);

// Listen for close click
closeBtn.addEventListener("click", closeModal);

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
