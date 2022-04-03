import API from "../../http";

export async function login(userData) {
  const { data } = await API.post("/login", userData);
  return data;
}

export async function registration(userData) {
  const { data } = await API.post("/registration", userData);
  return data;
}

export async function checkAuth() {
  const { data } = await API.get("/refresh", { withCredentials: true });
  return data;
}

export async function logout() {
  return API.post("/logout");
}
