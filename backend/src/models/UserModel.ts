import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  comparePassword(password: string): Promise<boolean>;
  generateAccessToken(token: string): Promise<string>;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      // const user = this as IUser;
      const hashPassword = await bcrypt.hash(this.password, 10);
      this.password = hashPassword;
    }

    //   if (this.userType !== "coach") {
    //     this.isVerifiedCoach = undefined;
    //   }

    next();
  } catch (error) {
    return next(error as Error);
  }
});

UserSchema.methods.comparePassword = async function (password: string) {
  const user = this;
  // console.log({password, userPassword: user.password})
  if (!password || !user.password) {
    throw new Error("Missing password or hash for comparison");
  }
  return await bcrypt.compare(password, user.password);
};

UserSchema.methods.generateAccessToken = function (secretToken: string) {
  const token = jwt.sign(
    {
      id: this._id
    },
    secretToken,
    { expiresIn: "1w" }
  );
  return token;
};

const UserModel = mongoose.model<IUser>("User", UserSchema);
export default UserModel;
