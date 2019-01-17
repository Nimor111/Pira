let contentDiv = document.getElementById("content");
console.log("CONTENT DIV: ", contentDiv);

const routes = {
  "/Pira/views": homepage,
  "/Pira/views/": homepage,
  "/Pira/views/index.html": homepage,
  "/Pira/views/login": loginPage,
  "/Pira/views/login.html": loginPage,
  "/Pira/views/register": registerPage
  // "/board/:id/detail": boardDetailPage
};

function insertHtml(html) {
  contentDiv.innerHTML = html;
  const codes = contentDiv.getElementsByTagName("script");
  for (let i = 0; i < codes.length; i++) {
    eval(codes[i].text);
  }
}

let onNavItemClick = pathname => {
  window.history.pushState({}, pathname, window.location.origin + pathname);

  insertHtml(routes[pathname]);
  checkLogin();
};

window.onpopstate = () => {
  insertHtml(routes[window.location.pathname]);
  checkLogin();
};

// contentDiv.innerHTML = routes[window.location.pathname];
insertHtml(routes[window.location.pathname]);
checkLogin();
