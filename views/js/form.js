async function createCard(boardId) {
  const form = document.getElementById("create-card-form"),
    title = form.elements[0].value,
    description = form.elements[1].value,
    assigneeSelect = document.getElementById("select-assignee"),
    assignee = assigneeSelect.options[assigneeSelect.selectedIndex].value,
    listSelect = document.getElementById("select-list"),
    list = listSelect.options[listSelect.selectedIndex].value;

  const users = await HttpClient.get("user");

  const lists = await HttpClient.getById("/board/lists", boardId);

  const userId = users.data.find(u => u.username === assignee).id;
  const listId = lists.data.find(l => l.name === list).id;

  const data = {
    title: title,
    description: description,
    list: listId,
    assignee: userId
  };

  await HttpClient.post("card", data);

  clearFields([title, description]);

  const pageData = await getBoardData(boardId);

  onDetailClick(boardId, "/Pira/views/board/:id/detail", pageData);

  document.getElementById("createCardModal").style.display = "none";
}

async function createList(id) {
  const form = document.getElementById("create-list-form");
  const name = form.elements[0].value;

  const data = {name, board: id};

  await HttpClient.post("list", data);

  clearFields([name]);

  const pageData = await getBoardData(id);

  onDetailClick(id, "/Pira/views/board/:id/detail", pageData);

  document.getElementById("createListModal").style.display = "none";
}

async function createBoard() {
  const form = document.getElementById("create-board-form");
  const title = document.getElementById("title");
  const teamSelect = document.getElementById("select-team");
  const team = teamSelect.options[teamSelect.selectedIndex].value;
  const userSelect = document.getElementById("select-lead");
  const user = userSelect.options[userSelect.selectedIndex].value;

  const teams = await HttpClient.get("team");
  // TODO validate
  const teamId = teams.data.find(t => t.name === team).id;

  const users = await HttpClient.get("user");
  // TODO validate
  const userId = users.data.find(u => u.username === user).id;

  const data = {title: title.value, team: teamId, lead: userId};

  await HttpClient.post("board", data);

  clearFields([title]);

  showBoards();

  document.getElementById("board-modal").style.display = "none";
}

async function login() {
  const loginForm = document.getElementById("login-form");
  const email = document.getElementById("login-email").value;

  const password = document.getElementById("login-password").value;

  const data = {email, password};

  const status = await HttpClient.login(data);

  if (status) {
    onNavItemClick("/Pira/views/");
  } else {
    const error = document.querySelector(".error");
    error.style.display = "block";
    error.style.opacity = "1";
    setTimeout(function() {
      hideErrorMessage(error);
    }, 3000);
  }
}

async function register() {
  const registerForm = document.getElementById("register-form");
  const email = document.getElementById("register-email").value;
  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;

  const data = {email, password, username};

  const status = await HttpClient.register(data);

  if (status) {
    onNavItemClick("/Pira/views/login");
  } else {
    const error = document.querySelector(".error");
    error.style.display = "block";
    error.style.opacity = "1";
    setTimeout(() => {
      hideErrorMessage(error);
    }, 3000);
  }
}

function hideErrorMessage(error) {
  error.style.opacity = "0";
  setTimeout(() => {
    error.style.display = "none";
  }, 600);
}

function clearFields(fields) {
  fields.forEach(field => {
    field.value = "";
  });
}
