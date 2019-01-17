function fetchNav() {
  fetch("partials/nav.html")
    .then(res => res.text())
    .then(html => {
      const div = document.createElement("div");
      div.innerHTML = html;
      document.body.appendChild(div);

      const modalScript = document.createElement("script");
      modalScript.src = "js/Modal.js";
      const navScript = document.createElement("script");
      navScript.src = "js/nav.js";
      document.body.appendChild(modalScript);
      document.body.appendChild(navScript);
    })
    .catch(err => {
      console.log(err);
    });
}
