import { validationResult } from "express-validator";
import { ApiError } from "../exceptions/apiError.js";
import {
  activateUser,
  loginUser,
  logoutUser,
  refreshUser,
  registrationUser,
  updateUserData,
  updatePassword,
  generateActivationLink,
} from "../service/user.js";

async function registration(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest("Ошибка при валидации", errors.array()));
    }
    const { email, password, firstName, lastName } = req.body;
    const userData = await registrationUser(
      email,
      password,
      firstName,
      lastName
    );
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(userData);
  } catch (e) {
    next(e);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const userData = await loginUser(email, password);
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(userData);
  } catch (e) {
    next(e);
  }
}

async function updateUser(req, res, next) {
  try {
    const userData = await updateUserData(req.body);
    return res.json(userData);
  } catch (e) {
    next(e);
  }
}

async function updateUserPassword(req, res, next) {
  try {
    const userData = await updatePassword(req.body);
    return res.json(userData);
  } catch (e) {
    next(e);
  }
}

async function logout(req, res, next) {
  try {
    const { refreshToken } = req.cookies;
    const token = await logoutUser(refreshToken);
    res.clearCookie("refreshToken");
    return res.json(token);
  } catch (e) {
    next(e);
  }
}

async function activate(req, res, next) {
  try {
    const { activationLink } = req.body;
    const userData = await activateUser(activationLink);
    return res.json(userData);
  } catch (e) {
    next(e);
  }
}

async function updateUserActivationLink(req, res, next) {
  try {
    const { id } = req.body;
    await generateActivationLink(id);
    return res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function refresh(req, res, next) {
  try {
    const { refreshToken } = req.cookies;
    const userData = await refreshUser(refreshToken);
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(userData);
  } catch (e) {
    next(e);
  }
}

export {
  registration,
  login,
  updateUser,
  updateUserPassword,
  updateUserActivationLink,
  logout,
  activate,
  refresh,
};
