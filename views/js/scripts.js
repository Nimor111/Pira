function nav() {
  const createBoardModal = new Modal(
    "board-modal",
    "create-board",
    "board-close-btn"
  );
  const createBtn = document.getElementById("submit-board");

  createBoardModal.addEventListeners([
    createBoardModal.openModal,
    showTeams,
    () => showUsers("select-lead")
  ]);

  createBtn.addEventListener("click", createBoard);
}

function cardModal(id) {
  const cardModal = new Modal(
    `card-modal-${id}`,
    `show-card-${id}`,
    `card-close-btn-${id}`
  );

  cardModal.addEventListeners([cardModal.openModal]);
}

function boardDetailModals(id) {
  const listModal = new Modal(
    "createListModal",
    "create-list",
    "list-close-btn"
  );
  const cardModal = new Modal(
    "createCardModal",
    "create-card",
    "card-close-btn"
  );

  listModal.addEventListeners([listModal.openModal]);
  cardModal.addEventListeners([
    cardModal.openModal,
    () => showUsers("select-assignee"),
    () => showListsByBoardId(id, "select-list")
  ]);

  document
    .getElementById("submit-card")
    .addEventListener("click", () => createCard(id));

  document
    .getElementById("submit-list")
    .addEventListener("click", () => createList(id));
}
