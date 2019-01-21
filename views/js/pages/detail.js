const boardDetailPage = `
<h1 class="board-detail-title">
  <% this.title %>
</h1>
<h4 class="board-detail-title">Lead:  <% this.lead %></h4>
<div class="board-actions">
  <button id="create-list">Create List</button>
  <button id="create-card">Create Card</button>
</div>
<div class="grid-container outline">
  <div class="row">
    <%for(let list in this.lists) {%>
    <div class="col-2 dropdown">
      <p class="collapsible-<%this.lists[list].id%>"><%this.lists[list].name%> <span class="collapsible-plus">+</span></p>
      <div class="card-dropdown-content">
        <%for(let card in this.lists[list].cards.data) {%>
        <p><% this.lists[list].cards.data[card].title %></p>
        <%}%>
      </div>
    </div>
    <script>
      collapseList(<% this.lists[list].id %>);
    </script>
    <%}%>
  </div>

  <div id="createListModal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <span id="list-close-btn" class="closeBtn">&times;</span>
        <h2>Create List</h2>
      </div>
      <div class="modal-body">
        <form id="create-list-form" accept-charset="utf-8">
          <label for="name">Name</label><br />
          <input type="text" name="name" id="name" placeholder="Enter name here..." />
        </form>
      </div>
      <button type="submit" class="modal-footer" id="submit-list">
        <h3>Create list</h3>
      </button>
    </div>
  </div>

  <div id="createCardModal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <span id="card-close-btn" class="closeBtn">&times;</span>
        <h2>Create Card</h2>
      </div>
      <div class="modal-body">
        <form id="create-card-form" accept-charset="utf-8">
          <label for="title">Title</label><br />
          <input type="text" name="title" id="title" placeholder="Enter title here..." />
          <label for="description">Description</label><br />
          <textarea id="description" placeholder="Enter description here..."></textarea>
          <label for="assignee">Assignee</label><br />
          <select id="select-assignee">
          </select>
          <label for="list">List</label><br />
          <select id="select-list">
          </select>
        </form>
      </div>
      <button type="submit" class="modal-footer" id="submit-card">
        <h3>Create card</h3>
      </button>
    </div>
  </div>

  <script>
    boardDetailModals(<% this.id %>);
  </script>
</div>
`;
