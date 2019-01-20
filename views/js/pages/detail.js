const boardDetailPage = `
<h1 class="board-detail-title">
  <% this.title %>
  <%for(let list in this.lists) {%>
  <p><%this.lists[list].name%></p>
  <%}%>
</h1>
`;
