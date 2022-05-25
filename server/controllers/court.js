import fetch from "node-fetch";
import { courtDocListMock } from "../mocks/court.js";

async function searchCourt(req, res, next) {
  try {
    // const {
    //   judgmentCode,
    //   justiceCode,
    //   courtCode,
    //   companyСode,
    //   stage,
    //   number,
    //   offset,
    // } = req.body;
    // const response = await fetch(
    //   `${process.env.APIV2}/court?apiKey=${process.env.API_KEY}&judgment_code=${judgmentCode}&justice_code=${justiceCode}&court_code=${courtCode}&company_code=${companyСode}&stage=${stage}&number=${number}&limit=20&offset=${offset}`
    // );
    // const json = await response.json();

    // if (json.status === "error") {
    //   throw {
    //     code: json.code,
    //     mock: courtDocListMock,
    //   };
    // }

    return res.send(courtDocListMock);
  } catch (error) {
    next(error);
  }
}

export { searchCourt };
