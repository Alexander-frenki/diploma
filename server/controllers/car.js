import fetch from "node-fetch";
import { carFinesMock, carInfoMock } from "../mocks/car.js";
import { parseBidcarsData } from "../service/bidcars.js";
import { updateUserCars } from "../service/car.js";

function parseCarData({ items }) {
  return items.map(
    ({ number, brand, model, color, makeYear, lastDate, kind, fuel, vin }) => [
      ["Номер", number],
      ["Марка", brand],
      ["Модель", model],
      ["Колір", color],
      ["Рік випуску", makeYear],
      ["Дата реєстрації", lastDate.split(" ")[0]],
      ["Тип", kind],
      ["Пальне", fuel],
      ["VIN", vin],
    ]
  );
}

function parseFineData({ items }) {
  return items.map(
    ({
      fineStatus,
      docId,
      department,
      fab,
      kupap,
      region,
      district,
      street,
      send,
      roadKm,
      consider,
      decision,
      penalty,
      sumPenalty,
      paidPenalty,
      pdd,
      dperpetration,
      dpaid,
      nprotocol,
      sprotocol,
      status,
      mark,
    }) => [
      ["Статус штрафу", fineStatus],
      ["Ідентифікатор штрафу", docId],
      ["Департамент поліції", department],
      ["Фабула правопорушення", fab],
      ["Порушена стаття КУПАП", kupap],
      ["Область", region],
      ["Район", district],
      ["Вулиця", street],
      ["Куди направлений протокол для розгляду", send],
      ["Кілометр дороги, де створено правопорушення", roadKm],
      ["Хто розглянув", consider],
      ["Рішення", decision],
      ["Вид покарання", penalty],
      ["Сума штрафу", sumPenalty],
      ["Сплачена сума штрафу", paidPenalty],
      ["Порушена стаття правил дорожнього руху", pdd],
      ["Дата вчинення правопорушення", dperpetration],
      ["Дата сплати", dpaid],
      ["Номер протоколу", nprotocol],
      ["Серія протоколу", sprotocol],
      ["Статус", status],
      ["Примітки до протоколу", mark],
    ]
  );
}

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
        mock: parseCarData(carInfoMock),
      };
    }

    return res.send(parseCarData(json.data));
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
        mock: parseFineData(carFinesMock),
      };
    }

    return res.send(parseFineData(json.data));
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
