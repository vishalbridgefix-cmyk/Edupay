import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userModel from "../models/user.model.js";
import { HttpStatusCode } from "../constants/httpStatus.js";
import tokenBlacklistModel from "../models/tokenBlacklist.model.js";

import {
  registerSchema,
  loginSchema
} from "../validations/user.validation.js";
import { Messages } from "../constants/messages.js";


export const registerController = async (req, res) => {

  try {

    // Validate registration data
    const { error, value } = registerSchema.validate(req.body ?? {});

    if (error) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: error.details[0].message,
        success: false,
      });
    }

    const {
      fullName,
      email,
      password,
      phone,
      age,
      gender,
      address,
      role,
      profileImage
    } = value;


    // Check existing user
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(HttpStatusCode.CONFLICT).json({
        message: Messages.ALREADY_EXISTS,
        success: false,
      });
    }


    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);


    // Create user with Cloudinary image URL
    const newUser = await userModel.create({

      fullName,
      email,
      password: hashedPassword,
      phone,
      age,
      gender,
      address,
      role,

      ProfileImage: profileImage || "",

    });


    return res.status(HttpStatusCode.CREATED).json({

      message: Messages.REGISTER_SUCCESS,

      success: true,

      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone,
        age: newUser.age,
        gender: newUser.gender,
        address: newUser.address,
        role: newUser.role,
        ProfileImage: newUser.ProfileImage,
      },

    });

  } catch (error) {

    console.error("Register Error:", error);

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
      success: false,
    });

  }

};


// LOGIN CONTROLLER

export const loginController = async (req, res) => {

  try {

    const { error, value } = loginSchema.validate(req.body);

    if (error) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: error.details.map((detail) => detail.message),
        success: false,
      });
    }

    const { email, password } = value;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        message: Messages.NOT_FOUND,
        success: false,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        message: Messages.INVALID_CREDENTIALS,
        success: false,
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(HttpStatusCode.SUCCESS).json({

      message: Messages.LOGIN_SUCCESS,

      success: true,

      token,

      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        age: user.age,
        gender: user.gender,
        address: user.address,
        role: user.role,
        profileImage: user.ProfileImage,
      },

    });

  } catch (error) {

    console.error("Login Error:", error);

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
      success: false,
    });

  }

};


// LOGOUT CONTROLLER

export const logoutController = async (req, res) => {

  try {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        message: Messages.AUTH_TOKEN_REQUIRED,
        success: false,
      });
    }
    
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await tokenBlacklistModel.create({

      token,

      expiresAt: new Date(decoded.exp * 1000),

    });

    return res.status(HttpStatusCode.SUCCESS).json({
      message: Messages.LOGOUT_SUCCESS,
      success: true,
    });

  } catch (error) {

    console.error("Logout Error:", error);

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
      success: false,
    });

  }

};