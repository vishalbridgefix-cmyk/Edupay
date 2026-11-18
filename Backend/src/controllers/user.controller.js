import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userModel from "../models/user.model.js";
import {
  registerSchema,
  loginSchema,
  updateProfileSchema,
} from "../validations/user.validation.js";

export const registerController = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    console.log(error);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
        success: false,
      });
    }

    const { fullName, email, password, phone, role } = req.body;

    const profileImage = req.file ? `/uploads/${req.file.filename}` : "";
    
    if (!fullName || !email || !password || !phone) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
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

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
        success: false,
      });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
      });
    }

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        message: "User not found. Please register first.",
        success: false,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
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
    return res.status(200).json({
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

    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const logoutController = async (req, res) => {
  try {
    const token=req.cookies?.token;
    if(!token){
      return res.status(400).json({message:"Already logged out",success:false})
    }
    res.clearCookie("token")
    return res.status(200).json({
      message: "Logout successfully",
      success: true,
    });
  } catch (error) {
    console.error("Logout Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const getProfileController = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Profile fetched successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get Profile Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const { error } = updateProfileSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
        success: false,
      });
    }

    const userId = req.user.userId;

    const { fullName, phone, profileImage } = req.body;

    const updateData = {};

    if (fullName !== undefined) {
      updateData.fullName = fullName;
    }

    if (phone !== undefined) {
      updateData.phone = phone;
    }

    if (profileImage !== undefined) {
      updateData.ProfileImage = profileImage;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message: "Please provide at least one field to update",
        success: false,
      });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
