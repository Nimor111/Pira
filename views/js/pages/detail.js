const boardDetailPage = `
<h1 class="board-detail-title">
  <% this.title %>
</h1>
<h4 class="board-detail-title">Lead:  <% this.lead %></h4>
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
</div>
`;
