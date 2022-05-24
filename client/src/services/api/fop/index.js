import API from "../../http";

export async function getFopInfo(fopData) {
  const { data } = await API.post("/fop-info", fopData);
  return data;
}
