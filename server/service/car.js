import { UserModel } from "../models/user.js";

async function updateUserCars(email, carsData) {
  const user = await UserModel.findOne({ email });

  user.cars = carsData;
  await user.save();
}

export { updateUserCars };
