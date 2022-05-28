import fetch from "node-fetch";
import { alimonyListMock, wantedListMock } from "../mocks/physical.js";

async function searchAlimony(req, res, next) {
  try {
    const { firstName, lastName, patronymic } = req.body;
    const response = await fetch(
      `${process.env.APIV2}/aliment?apiKey=${process.env.API_KEY}&pib=${lastName}%20${firstName}%20${patronymic}&limit=100`
    );
    const json = await response.json();
    if (json.status === "error") {
      throw {
        code: json.code,
        mock: alimonyListMock,
      };
    }

    return res.send(json);
  } catch (error) {
    next(error);
  }
}

async function searchWanted(req, res, next) {
  try {
    const { firstName, lastName, patronymic } = req.body;
    const response = await fetch(
      `${process.env.APIV2}/wanted?apiKey=${process.env.API_KEY}&pib=${lastName}%20${firstName}%20${patronymic}&limit=100`
    );

    const json = await response.json();
    if (json.status === "error") {
      throw {
        code: json.code,
        mock: wantedListMock,
      };
    }
    return res.send(json.data);
  } catch (error) {
    next(error);
  }
}

export { searchAlimony, searchWanted };
