
import jwt from "jsonwebtoken";

import tokenBlacklistModel from "../models/tokenBlacklist.model.js";
export const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication token is required",
        success: false,
      });
    }
    const token = authHeader.split(" ")[1];

    
    const blacklistedToken = await tokenBlacklistModel.findOne({
      token,
    });

    if (blacklistedToken) {
      return res.status(401).json({
        message: "You are logged out",
        success: false,
      });
    }

    
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
      success: false,
    });
  }
};
