function nav() {
  const createBoardModal = new Modal(
    "simpleModal",
    ".createButton",
    ".closeBtn"
  );
  const createBtn = document.getElementById("submit-board");

  createBoardModal.addEventListeners([
    createBoardModal.openModal,
    showTeams,
    showUsers
  ]);

  createBtn.addEventListener("click", createBoard);

  return createBoardModal;
}

function collapseList(id) {
  const collapsible = document.querySelector(`.collapsible-${id}`);
  collapsible.addEventListener("click", function() {
    this.classList.toggle("active");
    const content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}
