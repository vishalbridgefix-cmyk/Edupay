
import jwt from "jsonwebtoken";
import tokenBlacklistModel from "../models/tokenBlacklist.model.js";
import { HttpStatusCode } from "../constants/httpStatus.js";
import { Messages } from "../constants/messages.js";

// Authentication Middleware
export const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: Messages.AUTH_TOKEN_REQUIRED,
      });
    }

    const token = authHeader.split(" ")[1];

    // Check whether token is blacklisted
    const blacklistedToken = await tokenBlacklistModel.findOne({
      token,
    });

    if (blacklistedToken) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: Messages.USER_LOGGED_OUT,
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
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      success: false,
      message: Messages.INVALID_OR_EXPIRED_TOKEN,
    });
  }
};


// Instructor Role Middleware
export const instructorMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      success: false,
      message: Messages.LOGIN_REQUIRED,
    });
  }

  if (req.user.role !== "instructor") {
    return res.status(HttpStatusCode.FORBIDDEN).json({
      success: false,
      message: Messages.INSTRUCTOR_ONLY,
    });
  }

  next();
};



// Learner Role Middleware
export const learnerMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      success: false,
      message: Messages.LOGIN_REQUIRED,
    });
  }

  if (req.user.role !== "learner") {
    return res.status(HttpStatusCode.FORBIDDEN).json({
      success: false,
      message: "Only learners can access learner dashboard APIs",
    });
  }

  next();
};
