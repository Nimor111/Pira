const createBoardModal = new Modal("simpleModal", ".createButton", ".closeBtn");
const createBtn = document.getElementById("submit-board");

createBoardModal.addEventListeners([
  createBoardModal.openModal,
  showTeams,
  showUsers
]);

createBtn.addEventListener("click", createBoard);
