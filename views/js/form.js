async function createBoard() {
  const form = document.getElementById("create-board-form");
  const title = document.getElementById("title").value;
  if (title === "") {
    return;
  }
  const teamSelect = document.getElementById("select-team");
  const team = teamSelect.options[teamSelect.selectedIndex].value;
  const userSelect = document.getElementById("select-lead");
  const user = userSelect.options[userSelect.selectedIndex].value;

  const teams = await State.getResource("team");
  // TODO validate
  const teamId = teams.find(t => t.name === team).id;

  const users = await State.getResource("user");
  // TODO validate
  const userId = users.find(u => u.username === user).id;

  const data = {title, team: teamId, lead: userId};

  await HttpClient.post("board", data);
  showBoards();

  closeModal();
}
