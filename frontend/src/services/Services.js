export default class Services {
  baseUrl = import.meta.env.VITE_APP_BACKEND_API_URL;

  async get(endpoint) {
    const res = await fetch(`${this.baseUrl}/${endpoint}`);

    console.log(baseUrl);

    if (!res.ok) throw new Error("Erreur GET");
    return res.json();
  }

  async post(endpoint, data, response = false) {
    const res = await fetch(`${this.baseUrl}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response) return res;

    if (!res.ok) throw new Error("Erreur POST");
    return res.json();
  }
}
