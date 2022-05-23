import fetch from "node-fetch";
import { carFinesMock, carInfoMock } from "../mocks/car.js";
import { parseBidcarsData } from "../service/bidcars.js";
import { updateUserCars } from "../service/car.js";

async function getCarInfo(req, res, next) {
  try {
    const { carNumber } = req.body;
    const response = await fetch(
      `${process.env.APIV3}/tech-passport?apiKey=${process.env.API_KEY}&number=${carNumber}`
    );
    const json = await response.json();

    if (json.status === "error") {
      throw {
        code: json.code,
        mock: carInfoMock,
      };
    }

    return res.send(json.data.items);
  } catch (error) {
    next(error);
  }
}

async function getCarFines(req, res, next) {
  try {
    const { carNumber } = req.body;
    const response = await fetch(
      `${process.env.APIV3}/fine?apiKey=${process.env.API_KEY}&auto_number=${carNumber}`
    );

    const json = await response.json();

    if (json.status === "error") {
      throw {
        code: json.code,
        mock: carFinesMock,
      };
    }

    return res.send(json.data.items);
  } catch (error) {
    next(error);
  }
}

async function updateCars(req, res, next) {
  try {
    const carNumbers = req.body;
    const { email } = req.user;
    await updateUserCars(email, carNumbers);
    return res.send({ ...req.user, cars: carNumbers });
  } catch (error) {
    next(error);
  }
}

async function findExternalCarInfo(req, res, next) {
  try {
    const { vin } = req.body;
    const carData = await parseBidcarsData(vin);
    if (!carData) {
      throw { code: 404 };
    }
    res.send(carData);
  } catch (error) {
    next(error);
  }
}

export { getCarInfo, updateCars, findExternalCarInfo, getCarFines };
