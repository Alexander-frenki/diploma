import fetch from "node-fetch";
import { companyInfoMock, companyListMock } from "../mocks/company.js";

async function searchCompany(req, res, next) {
  try {
    const { companyName } = req.body;
    const response = await fetch(
      `${process.env.APIV3}/search/companies-by-field?apiKey=${process.env.API_KEY}&field=full_name&q=${companyName}`
    );
    const json = await response.json();

    if (json.status === "error") {
      throw {
        code: json.code,
        mock: companyListMock,
      };
    }

    return res.send(json.data.items);
  } catch (error) {
    next(error);
  }
}

async function getCompanyInfo(req, res, next) {
  try {
    const { companyCode } = req.body;
    const response = await fetch(
      `${process.env.APIV3}/full-company/${companyCode}/?apiKey=${process.env.API_KEY}`
    );
    const json = await response.json();

    if (json.status === "error") {
      throw {
        code: json.code,
        mock: companyInfoMock,
      };
    }

    return res.send(json.data);
  } catch (error) {
    next(error);
  }
}

export { getCompanyInfo, searchCompany };
