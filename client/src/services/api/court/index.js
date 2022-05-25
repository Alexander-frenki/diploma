import API from "../../http";

export async function searchCourtDoc(courtData) {
  const { data } = await API.post("/search-court", courtData);
  return data;
}
