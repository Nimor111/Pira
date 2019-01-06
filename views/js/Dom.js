function populateBoards(boards) {
  const tbody = document.getElementById("board-table-body");

  boards.data.forEach(board => {
    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${board.title}</td>
    <td>${board.team}</td>
    <td>${board.lead.username}</td>
    <td>${board.created_at}</td>
    `;

    tbody.appendChild(row);
  });
}
