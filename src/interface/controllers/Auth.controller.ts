import { Response } from "express";
import { sendResponse } from "../../shared/response";
import { HTTP_STATUS_CODES } from "../../shared/statuscodes";
import { MongoUserRepo } from "../../infrastructure/repository/mongo.repository";
import { UserUseCases } from "../../application/usecase/usecases";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../auth/jwt.services";
import cloudinary from "../../shared/cloudinary.config";
import streamifier from "streamifier";

const userRepository = new MongoUserRepo();
const usecaseUser = new UserUseCases(userRepository);

export class AuthController {
  async signup(req: any, res: Response): Promise<void> {
    try {
      const existuser = await usecaseUser.findUserbyMail(req.body?.email);

      if (!existuser) {
        const password = await bcrypt.hash(req.body?.password, 10);
        const user = usecaseUser.signUp({ ...req.body, password });
        console.log("user:", user);
        const userData = (await user).toObject();
        console.log("userData,:", userData);

        sendResponse(
          res,
          HTTP_STATUS_CODES.ok,
          { userData },
          "user created successfully"
        );
        return;
      }

      sendResponse(
        res,
        HTTP_STATUS_CODES.BAD_REQUEST,
        existuser,
        "Email already exists"
      );
      return;
    } catch (error: any) {
      sendResponse(
        res,
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        null,
        "Failed to create User. please try again later."
      );
    }
  }

  async signin(req: any, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await usecaseUser.findUserbyMail(email);
      if (!user) {
        sendResponse(
          res,
          HTTP_STATUS_CODES.BAD_REQUEST,
          null,
          "No user exists in this email"
        );
        return;
      }
      const passMatch = await bcrypt.compare(password, user.password);
      if (!passMatch) {
        sendResponse(
          res,
          HTTP_STATUS_CODES.BAD_REQUEST,
          user,
          "Invalid Password"
        );
        return;
      }
      if (!user.id || !user.role) {
        sendResponse(
          res,
          HTTP_STATUS_CODES.BAD_REQUEST,
          null,
          "Invald user Data"
        );
        return;
      }

      const accesstoken = await generateAccessToken(user.id, user.role);
      const refreshtoken = await generateRefreshToken(user.id, user.role);

      const userData = user.toObject();
      delete userData.password;

      res.cookie("access", accesstoken, {
        httpOnly: true,  
        secure: false,
        sameSite: "strict",
        maxAge: 1000, 
      });
      
      res.cookie("refresh", refreshtoken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, 
      });
      

      sendResponse(res, HTTP_STATUS_CODES.ok,userData, "login success");
    } catch (error) {
      sendResponse(
        res,
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        null,
        "Failed authentication"
      );
    }
  }

  async updateProfile(req: any, res: Response): Promise<void> {
    if (req.body.dateOfBirth) {
      req.body.dateOfBirth = new Date(req.body.dateOfBirth);
    }
    // console.log('worindkklagsdm 118')

    const file = req.files?.file;
    let result: any;

    try {
      result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "profiles" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier.createReadStream(file.data).pipe(uploadStream);
      });
    } catch (error) {
      console.log(error);
      sendResponse(
        res,
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        null,
        "Image upload failed"
      );
    }
    req.body.imageUrl = result?.secure_url;

    const user = await usecaseUser.updateProfile(req.body);

    if (!user) {
      sendResponse(res, HTTP_STATUS_CODES.BAD_REQUEST, null, "user not found");
    }

    sendResponse(
      res,
      HTTP_STATUS_CODES.ok,
      user,
      "user profile updated succesfully"
    );
  }
}
