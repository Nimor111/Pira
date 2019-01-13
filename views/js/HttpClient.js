class HttpClient {
  static async get(resource) {
    const res = await fetch(`/Pira/routes/${resource}/read.php`);
    const data = await res.json();

    return data;
  }

  static async login(data) {
    const res = await fetch(`/Pira/routes/user/login.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    if (res.status === 401) {
      return false;
    }

    return true;
  }

  static async post(resource, data) {
    const res = await fetch(`/Pira/routes/${resource}/create.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    return await res.json();
  }

  static async put(resource, data) {
    const res = await fetch(`/Pira/routes/${resource}/update.php`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    return await res.json();
  }

  static async delete(resource, data) {
    const res = await fetch(`/Pira/routes/${resource}/delete.php`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    return await res.json();
  }
}
