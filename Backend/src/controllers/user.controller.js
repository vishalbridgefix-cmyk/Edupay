
import { HttpStatusCode } from "../constants/httpStatus.js";
import userModel from "../models/user.model.js";
import {
  updateProfileSchema,
} from "../validations/user.validation.js";


export const getProfileController = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(HttpStatusCode.SUCCESS).json({
      message: "Profile fetched successfully",
      success: true,
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
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });

  } catch (error) {
    console.error("Get Profile Error:", error);

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};




export const updateProfileController = async (req, res) => {
  try {
    const { error, value } = updateProfileSchema.validate(req.body);

    if (error) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: error.details.map((detail) => detail.message),
        success: false,
      });
    }

    const userId = req.user.userId;

    const {
      fullName,
      phone,
      age,
      gender,
      address,
    } = value;

    const updateData = {};

    if (fullName !== undefined) {
      updateData.fullName = fullName;
    }

    if (phone !== undefined) {
      updateData.phone = phone;
    }

    if (age !== undefined) {
      updateData.age = age;
    }

    if (gender !== undefined) {
      updateData.gender = gender;
    }

    if (address !== undefined) {
      updateData.address = address;
    }

    if (req.file) {
      updateData.ProfileImage = `/uploads/${req.file.filename}`;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: " provide at least one field to update",
        success: false,
      });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(HttpStatusCode.SUCCESS).json({
      message: "Profile updated successfully",
      success: true,
      user: {
        _id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        phone: updatedUser.phone,
        age: updatedUser.age,
        gender: updatedUser.gender,
        address: updatedUser.address,
        role: updatedUser.role,
        profileImage: updatedUser.ProfileImage,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      },
    });

  } catch (error) {
    console.error("Update Profile Error:", error);

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
