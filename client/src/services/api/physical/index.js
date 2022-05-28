import API from "../../http";

export async function getAlimony(personData) {
  const { data } = await API.post("/alimony", personData);
  return data;
}

export async function getWanted(personData) {
  const { data } = await API.post("/wanted", personData);
  return data;
}
