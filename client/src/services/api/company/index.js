import API from "../../http";

export async function getCompanyInfo(companyData) {
  const { data } = await API.post("/company-info", companyData);
  return data;
}

export async function searchCompany(companyData) {
  const { data } = await API.post("/search-company", companyData);
  return data;
}
