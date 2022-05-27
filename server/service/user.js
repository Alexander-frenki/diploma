import bcrypt from "bcrypt";
import { v4 } from "uuid";
import { UserModel } from "../models/user.js";
import { sendActivationMail } from "./mail.js";
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
      `Користувач із поштовою адресою ${email} вже існує`
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
    isActivated: false,
  });
  await sendActivationMail(
    email,
    `${process.env.CLIENT_URL}/activate/${activationLink}`
  );
  const userDto = parseUserData(user); // id, email, isActivated
  const tokens = generateTokens({ ...userDto });
  await saveToken(userDto.id, tokens.refreshToken);

  return { ...tokens, user: userDto };
}

async function activateUser(activationLink) {
  const user = await UserModel.findOneAndUpdate(
    { activationLink },
    { isActivated: true },
    { new: true }
  );
  if (!user) {
    throw ApiError.BadRequest("Некоректне посилання на активацію");
  }

  return parseUserData(user);
}

async function generateActivationLink(id) {
  const user = await UserModel.findOne({ _id: id });
  const activationLink = v4();

  await sendActivationMail(
    user.email,
    `${process.env.CLIENT_URL}/activate/${activationLink}`
  );

  user.activationLink = activationLink;
  await user.save();
}

async function loginUser(email, password) {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw ApiError.BadRequest("Користувача з таким email не знайдено");
  }
  const isPassEquals = await bcrypt.compare(password, user.password);
  if (!isPassEquals) {
    throw ApiError.BadRequest("Невірний пароль");
  }
  const userDto = parseUserData(user);
  const tokens = generateTokens({ ...userDto });

  await saveToken(userDto.id, tokens.refreshToken);
  return { ...tokens, user: userDto };
}

async function updateUserData({ id, ...updatedData }) {
  const user = await UserModel.findOne({ _id: id });
  const isEmailChanged = user.email !== updatedData.email;

  if (isEmailChanged) {
    const candidate = await UserModel.findOne({ email: updatedData.email });
    if (candidate) {
      throw ApiError.BadRequest(
        `Користувач із поштовою адресою ${updatedData.email} вже існує`
      );
    }
    const activationLink = v4();
    await sendActivationMail(
      updatedData.email,
      `${process.env.CLIENT_URL}/activate/${activationLink}`
    );
    user.activationLink = activationLink;
    user.isActivated = false;
  }

  Object.entries(updatedData).forEach(([key, value]) => {
    user[key] = value;
  });

  await user.save();
  return parseUserData(user);
}

async function updatePassword({ id, password, newPassword }) {
  const user = await UserModel.findOne({ _id: id });
  const isPassEquals = await bcrypt.compare(password, user.password);
  if (!isPassEquals) {
    throw ApiError.BadRequest("Невірний пароль");
  }
  const hashPassword = await bcrypt.hash(newPassword, 3);
  user.password = hashPassword;
  await user.save();
  return parseUserData(user);
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

export {
  registrationUser,
  activateUser,
  updateUserData,
  updatePassword,
  generateActivationLink,
  loginUser,
  logoutUser,
  refreshUser,
};
