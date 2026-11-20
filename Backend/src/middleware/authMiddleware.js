
import jwt from "jsonwebtoken";
import tokenBlacklistModel from "../models/tokenBlacklist.model.js";

// Authentication middleware
export const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is required",
      });
    }

    const token = authHeader.split(" ")[1];

    // Check whether token is blacklisted
    const blacklistedToken = await tokenBlacklistModel.findOne({
      token,
    });

    if (blacklistedToken) {
      return res.status(401).json({
        success: false,
        message: "You are logged out",
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("Decoded Token:", decoded);

    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// Instructor role middleware
export const instructorMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Please login first",
    });
  }

  if (req.user.role !== "instructor") {
    return res.status(403).json({
      success: false,
      message: "Only instructors can manage courses",
    });
  }

  next();
};
