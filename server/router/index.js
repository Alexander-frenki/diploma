import { Router } from "express";
import { body } from "express-validator";
import {
  findExternalCarInfo,
  getCarFines,
  getCarInfo,
  updateCars,
} from "../controllers/car.js";
import { getCompanyInfo, searchCompany } from "../controllers/company.js";
import { searchCourt } from "../controllers/court.js";
import { getFopInfo } from "../controllers/fop.js";
import { searchAlimony, searchWanted } from "../controllers/physical.js";
import {
  activate,
  confirmPassword,
  login,
  logout,
  recoveryPassword,
  refresh,
  registration,
  updateUser,
  updateUserActivationLink,
  updateUserPassword,
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

router.put(
  "/update-user",
  authMiddleware,
  body("email").isEmail().isLength({ max: 255 }),
  body("firstName").isLength({ min: 2, max: 255 }),
  body("lastName").isLength({ min: 2, max: 255 }),
  updateUser
);

router.put(
  "/update-user-password",
  authMiddleware,
  body("password").isLength({ min: 8, max: 255 }),
  body("newPassword").isLength({ min: 8, max: 255 }),
  updateUserPassword
);

router.post("/logout", logout);
router.post("/activate", authMiddleware, activate);
router.post(
  "/update-user-activation-link",
  authMiddleware,
  updateUserActivationLink
);
router.get("/refresh", refresh);
router.post("/recovery-password", recoveryPassword);
router.post(
  "/confirm-password",
  body("newPassword").isLength({ min: 8, max: 255 }),
  confirmPassword
);

router.post("/car-info", authMiddleware, getCarInfo);
router.post("/car-update", authMiddleware, updateCars);
router.post("/car-external-info", authMiddleware, findExternalCarInfo);
router.post("/car-fines", authMiddleware, getCarFines);

router.post("/company-info", authMiddleware, getCompanyInfo);
router.post("/search-company", authMiddleware, searchCompany);
router.post("/fop-info", authMiddleware, getFopInfo);

router.post("/search-court", authMiddleware, searchCourt);

router.post("/alimony", authMiddleware, searchAlimony);
router.post("/wanted", authMiddleware, searchWanted);

export { router };
