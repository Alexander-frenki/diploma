import { Router } from "express";
import { body } from "express-validator";
import {
  activate,
  login,
  logout,
  refresh,
  registration,
} from "../controllers/user.js";
// import { authMiddleware } from "../middlewares/auth";
// import { carController } from "../controllers/car";

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
// router.get("/users", authMiddleware, userController.getUsers);

// router.post("/car-info", authMiddleware, carController.getCarInfo);

export { router };
