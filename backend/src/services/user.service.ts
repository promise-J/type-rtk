import UserModel from "../models/UserModel";
import { LoginUser, RegisterUser } from "../types";
import { sendServiceResult } from "../utils";

export const registerUserService = async (data: RegisterUser) => {
    try {
        const { email, username, password } = data;
        const userExists = await UserModel.findOne({ email });
        if (userExists) {
          return sendServiceResult(
            false,
            null,
            "User with this email already exists"
          );
        }
        const newUser = new UserModel({
          email,
          username,
          password,
        });
        await newUser.save();
        return sendServiceResult(true, "User created successfully");
    } catch (error) {
        console.log(error)
        return sendServiceResult(false, null, "Registration failed due to server error");
    }
};

export const loginUserService = async (data: LoginUser) => {
  try {
    const { email, password } = data;
    const userExists = await UserModel.findOne({ email });
    if (!userExists) {
      return sendServiceResult(
        false,
        null,
        "User with this email does not exist"
      );
    }

    const isPasswordValid = await userExists.comparePassword(password);
    if (!isPasswordValid) {
      return sendServiceResult(false, null, "Invalid password");
    }
    const token = userExists.generateAccessToken(
      process.env.ACCESS_TOKEN || "secret"
    );
    return sendServiceResult(true, token);
  } catch (error) {
    return sendServiceResult(false, null, "Login failed due to server error");
  }
};

export const getUserAccountService = async (userId: string) => {
  try {
    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      return sendServiceResult(false, null, "User not found");
    }
    return sendServiceResult(true, user);
  } catch (error) {
    return sendServiceResult(false, null, "Failed to fetch user account");
  }
};
