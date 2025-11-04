import { Router } from "express";
import { getUserAccountController, loginUserController, registerUserController } from "../controllers";
import { validateRequest } from "../middlewares";
import { loginUserSchema, registerUserSchema } from "../validations";
import auth from "../middlewares/auth";

const router = Router();

router.post(
  "/register",
  validateRequest(registerUserSchema),
  registerUserController
);

router.post(
  "/login",
  validateRequest(loginUserSchema),
  loginUserController
);

router.get(
  "/get-account",
  auth,
  getUserAccountController
);

export default router;
