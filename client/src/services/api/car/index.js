import API from "../../http";

export async function getCarInfo(carData) {
  const { data } = await API.post("/car-info", carData);
  return data;
}

export async function getCarFines(carData) {
  const { data } = await API.post("/car-fines", carData);
  return data;
}

export async function updateUserCars(carNumbers) {
  const { data } = await API.post("/car-update", carNumbers);
  return data;
}

export async function getExternalCarInfo({ carVin }) {
  const { data } = await API.post("/car-external-info", { vin: carVin });
  return data;
}
