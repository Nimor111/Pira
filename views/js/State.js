class State {
  static async getResource(resource) {
    if (localStorage.getItem(resource)) {
      return JSON.parse(localStorage.getItem(resource));
    }

    const data = await HttpClient.get(resource);
    localStorage.setItem(resource, JSON.stringify(data.data));

    return JSON.parse(localStorage.getItem(resource));
  }
}
