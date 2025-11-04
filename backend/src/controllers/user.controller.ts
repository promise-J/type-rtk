import { Request, Response } from "express";
import { sendError, sendSuccess } from "../utils";
import {
  getUserAccountService,
  loginUserService,
  registerUserService,
} from "../services";
import { LoginUser, RegisterUser } from "../types";
import { AuthRequest } from "../types/express";

export async function registerUserController(req: Request, res: Response) {
  try {
    const post = req.body;

    const { email, password, username }: RegisterUser = post;
    const result = await registerUserService({ email, password, username });
    if (!result.success) {
      return sendError(res, result.error || "Registration failed", 400);
    } else {
      return sendSuccess(res, result.data, "User registration successful");
    }
  } catch (error) {}
}
export async function loginUserController(req: Request, res: Response) {
  try {
    const post = req.body;

    const { email, password }: LoginUser = post;
    const result = await loginUserService({ email, password });
    if (!result.success) {
      return sendError(res, result.error || "Registration failed", 400);
    } else {
      return sendSuccess(res, result.data, "User login successful");
    }
  } catch (error) {}
}

export async function getUserAccountController(
  req: AuthRequest,
  res: Response
) {
  try {
    const userId = req.user?.id || null;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    const result = await getUserAccountService(userId as string);

    if (!result?.success) {
      return sendError(
        res,
        result?.error || "Failed to fetch user account",
        400
      );
    } else {
      return sendSuccess(res, result.data, "User fetched successfully");
    }
  } catch (error) {}
}
