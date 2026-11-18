
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    // Get token from cookie
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "Authentication token is required",
        success: false,
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
      success: false,
    });
  }
};

// Check instructor role
export const instructorMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Please login first",
      success: false,
    });
  }

  if (req.user.role !== "instructor") {
    return res.status(403).json({
      message: "Only instructors can manage courses",
      success: false,
    });
  }

  next();
};

export const isAuthenticated = authMiddleware;
