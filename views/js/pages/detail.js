const boardDetailPage = `
<h1 class="board-detail-title">
  <% this.title %>
</h1>
<h4 class="board-detail-title">Lead:  <% this.lead %></h4>
<div class="board-actions">
  <button id="create-list">Create List</button>
  <button id="create-card">Create Card</button>
</div>
<div class="grid-container">
  <div class="scroller">
    <%for(let list in this.lists) {%>
    <div class="col-1 collapsible">
      <p class="collapsible-<%this.lists[list].id%>"><%this.lists[list].name%></p>
      <div class="inner-collapsible">
        <%for(let card in this.lists[list].cards.data) {%>
        <div class="card-dropdown-content" id="show-card-<%this.lists[list].cards.data[card].id%>"><% this.lists[list].cards.data[card].title %></div>
          <div id="card-modal-<%this.lists[list].cards.data[card].id%>" class="modal">
            <div class="modal-content">
              <div class="modal-header">
                <span id="card-close-btn-<%this.lists[list].cards.data[card].id%>"" class="closeBtn"">&times;</span>
                <h2><% this.lists[list].cards.data[card].title %></h2>
              </div>
              <div class="modal-body">
                <h3>Description</h3>
                <p><% this.lists[list].cards.data[card].description %></p>
              </div>
              <button type="button" class="modal-footer"></button>
            </div>
          </div>
          <script>
            cardModal(<%this.lists[list].cards.data[card].id%>);
          </script>
        <%}%>
      </div>
    </div>
    <%}%>
  </div>
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
`;
