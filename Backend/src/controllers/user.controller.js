
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

    return res.status(HttpStatusCode.OK).json({
      message: "Profile fetched successfully",
      success: true,
      user,
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
    const { error } = updateProfileSchema.validate(req.body);

    if (error) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
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
      return res.status(HttpStatusCode.BAD_REQUEST).json({
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
      return res.status(HttpStatusCode.NOT_FOUND).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(HttpStatusCode.OK).json({
      message: "Profile updated successfully",
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
