import express from "express";
import {
  signupValidation,
  signinValidation,
} from "../../validation/validation";
import { validateRequest } from "../middlewares/validate";
import { AuthController } from "../../controllers/Auth.controller";
import fileUpload from "express-fileupload";
import { authentication } from "../middlewares/Authentication";

const userRoute = express.Router();
const authcontroller = new AuthController();

userRoute.post(
  "/signup",
  signupValidation,
  authcontroller.signup
);
userRoute.post(
  "/signin",
  signinValidation,
  authcontroller.signin
);
userRoute.post(
  "/updateProfile",
  authentication,
  fileUpload(),
  authcontroller.updateProfile
);

export default userRoute;
