function populateBoards(boards, lists, cards) {
  const tbody = document.getElementById("board-table-body");
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  if (boards.data) {
    boards.data.forEach((board, idx) => {
      const row = document.createElement("tr");

      row.innerHTML = `
      <td><a class="board-detail" id="board-id-${
        board.id
      }"><i class="fas fa-image"></i></a> ${board.title}</td>
      <td>${board.team}</td>
      <td>${board.lead.username}</td>
      <td>${board.created_at}</td>
      <td class="hidden-id">${board.id}</td>
      `;

      tbody.appendChild(row);
      const a = document.getElementById(`board-id-${board.id}`);
      const data = {
        id: board.id,
        title: board.title,
        lead: board.lead.username,
        team: board.team,
        lists: !lists[idx].data ? [] : lists[idx].data
      };
      a.addEventListener("click", () =>
        onDetailClick(board.id, "/Pira/views/board/:id/detail", data)
      );
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

function populateUsers(users) {
  const select = document.getElementById("select-lead");
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

async function showBoardLists(boards) {
  let lists = {};
  if (boards.data) {
    for (let i = 0; i < boards.data.length; i++) {
      const l = await HttpClient.getById("/board/lists", boards.data[i].id);
      lists[i] = l;
    }
  }

  return lists;
}

async function showListCards(lists) {
  for (let i = 0; i < Object.keys(lists).length; i++) {
    if (lists[i].data) {
      for (let j = 0; j < lists[i].data.length; j++) {
        const c = await HttpClient.getById("/list/cards", lists[i].data[j].id);
        lists[i].data[j].cards = c;
      }
    }
  }

  return lists;
}

async function showBoards() {
  const boards = await HttpClient.get("board");
  let lists = await showBoardLists(boards);
  lists = await showListCards(lists);

  populateBoards(boards, lists);
}

async function showTeams() {
  const teams = await HttpClient.get("team");
  populateTeams(teams);
}

// TODO show team members when relation has been added
async function showUsers() {
  const users = await HttpClient.get("user");
  populateUsers(users);
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
