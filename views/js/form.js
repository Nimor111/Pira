async function createBoard() {
  const form = document.getElementById("create-board-form");
  const title = document.getElementById("title");
  if (title === "") {
    return;
  }
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

  createBoardModal.closeModal();
}

async function login() {
  const loginForm = document.getElementById("login-form");
  const email = document.getElementById("login-email").value;
  if (email === "") {
    return;
  }
  const password = document.getElementById("login-password").value;

  const data = {email, password};

  const status = await HttpClient.login(data);

  if (status) {
    window.location.replace("index.html");
  } else {
    const error = document.querySelector(".error");
    error.style.display = "block";
    error.style.opacity = "1";
    setTimeout(function() {
      hideErrorMessage(error);
    }, 3000);
  }
}

function hideErrorMessage(error) {
  error.style.opacity = "0";
  setTimeout(function() {
    error.style.display = "none";
  }, 600);
}

function clearFields(fields) {
  fields.forEach(field => {
    field.value = "";
  });
}
