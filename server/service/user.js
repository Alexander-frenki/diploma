import bcrypt from "bcrypt";
import { v4 } from "uuid";
import { UserModel } from "../models/user.js";
// import { sendActivationMail } from "./mail.js";
import {
  findToken,
  generateTokens,
  removeToken,
  saveToken,
  validateRefreshToken,
} from "./token.js";
import { ApiError } from "../exceptions/apiError.js";

function parseUserData({
  _id: id,
  email,
  firstName,
  lastName,
  isActivated,
  cars,
}) {
  return {
    id,
    email,
    firstName,
    lastName,
    isActivated,
    cars,
  };
}

async function registrationUser(email, password, firstName, lastName) {
  const candidate = await UserModel.findOne({ email });
  if (candidate) {
    throw ApiError.BadRequest(
      `Пользователь с почтовым адресом ${email} уже существует`
    );
  }
  const hashPassword = await bcrypt.hash(password, 3);
  const activationLink = v4(); // v34fa-asfasf-142saf-sa-asf

  const user = await UserModel.create({
    email,
    password: hashPassword,
    firstName,
    lastName,
    activationLink,
    isActivated: true,
  });
  // await sendActivationMail(
  //   email,
  //   `${process.env.API_URL}/api/activate/${activationLink}`
  // );
  const userDto = parseUserData(user); // id, email, isActivated
  const tokens = generateTokens({ ...userDto });
  await saveToken(userDto.id, tokens.refreshToken);

  return { ...tokens, user: userDto };
}

async function activateUser(activationLink) {
  const user = await UserModel.findOne({ activationLink });
  if (!user) {
    throw ApiError.BadRequest("Неккоректная ссылка активации");
  }
  user.isActivated = true;
  await user.save();
}

async function loginUser(email, password) {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw ApiError.BadRequest("Пользователь с таким email не найден");
  }
  const isPassEquals = await bcrypt.compare(password, user.password);
  if (!isPassEquals) {
    throw ApiError.BadRequest("Неверный пароль");
  }
  const userDto = parseUserData(user);
  const tokens = generateTokens({ ...userDto });

  await saveToken(userDto.id, tokens.refreshToken);
  return { ...tokens, user: userDto };
}

async function logoutUser(refreshToken) {
  const token = await removeToken(refreshToken);
  return token;
}

async function refreshUser(refreshToken) {
  if (!refreshToken) {
    throw ApiError.UnauthorizedError();
  }
  const userData = validateRefreshToken(refreshToken);
  const tokenFromDb = await findToken(refreshToken);
  if (!userData || !tokenFromDb) {
    throw ApiError.UnauthorizedError();
  }
  const user = await UserModel.findById(userData.id);
  const userDto = parseUserData(user);
  const tokens = generateTokens({ ...userDto });

  await saveToken(userDto.id, tokens.refreshToken);
  return { ...tokens, user: userDto };
}

export { registrationUser, activateUser, loginUser, logoutUser, refreshUser };
