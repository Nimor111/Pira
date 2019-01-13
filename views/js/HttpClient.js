class HttpClient {
  static async get(resource) {
    const res = await fetch(`/Pira/routes/${resource}/read.php`);
    const data = await res.json();

    return data;
  }

  static login(data) {
    return fetch(`/Pira/routes/user/login.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.status === 401) {
          return false;
        } else {
          return true;
        }
      })
      .then(success => success);
  }

  static post(resource, data) {
    return fetch(`/Pira/routes/${resource}/create.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        return data;
      });
  }

  static put(resource, data) {
    return fetch(`/Pira/routes/${resource}/update.php`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        return data;
      });
  }

  static delete(resource, data) {
    return fetch(`/Pira/routes/${resource}/delete.php`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        return data;
      });
  }
}
