function populateBoards(boards) {
  const tbody = document.getElementById("board-table-body");
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  if (boards.data) {
    boards.data.forEach(board => {
      const row = document.createElement("tr");

      row.innerHTML = `
    <td>${board.title}</td>
    <td>${board.team}</td>
    <td>${board.lead.username}</td>
    <td>${board.created_at}</td>
    <td class="board-id">${board.id}</td>
    `;

      tbody.appendChild(row);
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

async function showBoards() {
  const boards = await HttpClient.get("board");
  populateBoards(boards);
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
