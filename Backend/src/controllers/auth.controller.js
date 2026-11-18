import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userModel from "../models/user.model.js";
import { HttpStatusCode } from "../constants/httpStatus.js";

import {
  registerSchema,
  loginSchema,
  
} from "../validations/user.validation.js";

export const registerController = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    console.log(error);
    if (error) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: error.details[0].message,
        success: false,
      });
    }

    const { fullName, email, password, phone, role } = req.body;

    const profileImage = req.file ? `/uploads/${req.file.filename}` : "";
    
    if (!fullName || !email || !password || !phone) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "All fields are required",
        success: false,
      });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "User with this email already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
      role,
      ProfileImage: profileImage,
    });

    return res.status(HttpStatusCode.CREATED).json({
      message: "User registered successfully",
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.error("Register Error:", error);

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);

    if (error) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: error.details[0].message,
        success: false,
      });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "Email and password are required",
        success: false,
      });
    }

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        message: "User not found. Please register first.",
        success: false,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        message: "Invalid email or password",
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
      },
    );
    res.cookie("token", token);
    return res.status(HttpStatusCode.OK).json({
      message: "Login successful",
      success: true,
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
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

export const logoutController = async (req, res) => {
  try {
    const token=req.cookies?.token;
    if(!token){
      return res.status(HttpStatusCode.BAD_REQUEST).json({message:"Already logged out",success:false})
    }
    res.clearCookie("token")
    return res.status(HttpStatusCode.OK).json({
      message: "Logout successfully",
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

