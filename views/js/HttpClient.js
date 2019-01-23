class HttpClient {
  static async get(resource) {
    const res = await fetch(`/Pira/routes/${resource}/read.php`);
    const data = await res.json();

    return data;
  }

  static async getSingle(resource, id) {
    const res = await fetch(`/Pira/routes/${resource}/read_single.php?id=${id}`);

    const data = await res.json();

    return data;
  }

  static async getById(resource, id) {
    const res = await fetch(`/Pira/routes/${resource}.php?id=${id}`);

    return await res.json();
  }

  static async patch(resource, id, data) {
    const res = await fetch(`/Pira/routes/${resource}/patch.php?id=${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    return await res.json();
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

    const credentials = res.headers.get("Authorization");
    localStorage.setItem("credentials", credentials);
    return true;
  }

  static async register(data) {
    const res = await fetch(`/Pira/routes/user/register.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    if (res.status === 400) {
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
