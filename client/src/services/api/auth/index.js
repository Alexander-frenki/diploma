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

export async function updateUser(userData) {
  const { data } = await API.put("/update-user", userData);
  return data;
}

export async function updateUserPassword(userData) {
  const { data } = await API.put("/update-user-password", userData);
  return data;
}

export async function updateUserActivationLink(userData) {
  await API.post("/update-user-activation-link", userData);
}

export async function activateUser(activationLink) {
  await API.post("/activate", { activationLink });
}
