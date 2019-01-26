let contentDiv = document.getElementById("content");

const routes = {
  "/Pira/views/": homepage,
  "/Pira/views/#/login": loginPage,
  "/Pira/views/#/register": registerPage,
  "/Pira/views/#/board/:id/detail": boardDetailPage
};

function insertHtml(html, data = {}) {
  const compiled = TemplateEngine(html, data);
  contentDiv.innerHTML = compiled;
  const codes = contentDiv.getElementsByTagName("script");
  for (let i = 0; i < codes.length; i++) {
    eval(codes[i].text);
  }
}

const onDetailClick = (id, pathname, data) => {
  // TODO implement proper authorization, e.g. members of team can only access detail etc.
  if (!localStorage.getItem("credentials")) {
    return onNavItemClick("/Pira/views/#/login");
  }

  const route = routes[pathname];
  pathname = pathname.replace(":id", id);
  window.history.pushState(
    data,
    PATH + pathname,
    window.location.origin + PATH + pathname
  );

  insertHtml(route, data);
  checkLogin();
};

const onNavItemClick = pathname => {
  window.history.pushState(
    {},
    PATH + pathname,
    window.location.origin + PATH + pathname
  );

  insertHtml(routes[pathname]);
  checkLogin();
};

window.onpopstate = event => {
  const path = ROOT + window.location.hash;
  const replaced = path.replace(/[0-9]+/g, ":id");
  const data = event.state ? event.state : {};
  insertHtml(routes[replaced], data);
  checkLogin();
};

const path = ROOT + window.location.hash;
const replaced = path.replace(/[0-9]+/g, ":id");
insertHtml(routes[replaced]);
checkLogin();
