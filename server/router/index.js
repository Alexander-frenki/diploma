import { Router } from "express";
import { body } from "express-validator";
import {
  findExternalCarInfo,
  getCarFines,
  getCarInfo,
  updateCars,
} from "../controllers/car.js";
import {
  activate,
  login,
  logout,
  refresh,
  registration,
} from "../controllers/user.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = new Router();

router.post(
  "/registration",
  body("email").isEmail().isLength({ max: 255 }),
  body("password").isLength({ min: 8, max: 255 }),
  body("firstName").isLength({ min: 2, max: 255 }),
  body("lastName").isLength({ min: 2, max: 255 }),
  registration
);
router.post(
  "/login",
  body("email").isEmail().isLength({ max: 255 }),
  body("password").isLength({ min: 8, max: 255 }),
  login
);
router.post("/logout", logout);
router.get("/activate/:link", activate);
router.get("/refresh", refresh);

router.post("/car-info", authMiddleware, getCarInfo);
router.post("/car-update", authMiddleware, updateCars);
router.post("/car-external-info", authMiddleware, findExternalCarInfo);
router.post("/car-fines", authMiddleware, getCarFines);

export { router };
