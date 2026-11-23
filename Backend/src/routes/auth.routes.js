import express from "express";

import {
  logoutController,
  registerController,
  loginController,
} from "../controllers/auth.controller.js";

import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register user
router.post("/register", registerController);

// Login user
router.post("/login", loginController);

// Logout user
router.post("/logout", isAuthenticated, logoutController);

export default router;