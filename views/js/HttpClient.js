class HtmlClient {
  static get(resource) {
    return fetch(`/Pira/routes/${resource}/read.php`)
      .then(res => res.json())
      .then(data => {
        return data;
      });
  }
}
