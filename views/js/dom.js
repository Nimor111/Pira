function populateBoards(boards) {
  const tbody = document.getElementById("board-table-body");
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  if (boards.data) {
    boards.data.forEach(async (board, idx) => {
      const row = document.createElement("tr");

      row.innerHTML = `
      <td><a class="board-detail" id="board-id-${
        board.id
      }"><i class="fas fa-image"></i></a> ${board.title}</td>
      <td>${board.team}</td>
      <td>${board.lead.username}</td>
      <td>${board.created_at}</td>
      <td class="hidden-id">${board.id}</td>
      <td><i id="delete-board-${
        board.id
      }" class="fas fa-trash delete-board"></i></td>
      `;

      tbody.appendChild(row);
      const a = document.getElementById(`board-id-${board.id}`);
      const data = await getBoardData(board.id);
      a.addEventListener("click", () =>
        onDetailClick(board.id, "/Pira/views/#/board/:id/detail", data)
      );

      document
        .getElementById(`delete-board-${board.id}`)
        .addEventListener("click", () => deleteBoard(board.id));
    });
  }
}

function populateTeams(teams) {
  const select = document.getElementById("select-team");
  while (select.firstChild) {
    select.removeChild(select.firstChild);
  }

  teams.data.forEach(team => {
    const option = document.createElement("option");
    option.value = team.name;
    const text = document.createTextNode(team.name);
    option.appendChild(text);
    select.appendChild(option);
  });
}

function populateLists(lists, element) {
  const select = document.getElementById(element);
  while (select.firstChild) {
    select.removeChild(select.firstChild);
  }

  lists.data.forEach(list => {
    const option = document.createElement("option");
    option.value = list.name;
    const text = document.createTextNode(list.name);
    option.appendChild(text);
    select.appendChild(option);
  });
}

function populateUsers(users, element) {
  const select = document.getElementById(element);
  while (select.firstChild) {
    select.removeChild(select.firstChild);
  }

  users.data.forEach(user => {
    const option = document.createElement("option");
    option.value = user.username;
    const text = document.createTextNode(user.username);
    option.appendChild(text);
    select.appendChild(option);
  });
}

async function getBoardData(id) {
  const board = await HttpClient.getSingle("board", id);
  const lists = await HttpClient.getById("board/lists", id);
  if (lists.data) {
    for (let i = 0; i < lists.data.length; i++) {
      lists.data[i].cards = await HttpClient.getById(
        "list/cards",
        lists.data[i].id
      );
    }
  }

  const data = {
    id: board.id,
    title: board.title,
    lead: board.lead.username,
    team: board.team,
    lists: lists.data ? lists.data : []
  };

  return data;
}

async function showBoards() {
  const boards = await HttpClient.get("board");

  if (boards.data) {
    populateBoards(boards);
  }
}

async function showTeams() {
  const teams = await HttpClient.get("team");
  if (teams.data) {
    populateTeams(teams);
  }
}

async function showListsByBoardId(boardId, element) {
  const lists = await HttpClient.getById("board/lists", boardId);
  populateLists(lists, element);
}

// TODO show team members when relation has been added
async function showUsers(element) {
  const users = await HttpClient.get("user");
  if (users.data) {
    populateUsers(users, element);
  }
}

function checkLogin() {
  const login = document.querySelector("ul.nav li.login");
  const register = document.querySelector("ul.nav li.register");
  const logout = document.querySelector("ul.nav li.logout");

  if (localStorage.getItem("credentials")) {
    login.style.display = "none";
    register.style.display = "none";
    logout.style.display = "block";
  } else {
    login.style.display = "block";
    register.style.display = "block";
    logout.style.display = "none";
  }
}

function logoutClick() {
  localStorage.removeItem("credentials");
}
