import express from "express";

import {
  logoutController,
  registerController,
  getProfileController,
  updateProfileController,
  loginController,
} from "../controllers/user.controller.js";

import { isAuthenticated } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/register", upload.single("profileImage"), registerController);

router.post("/login", loginController);

router.post("/logout", isAuthenticated, logoutController);

router.get("/me", isAuthenticated, getProfileController);

router.patch(
  "/me",
  isAuthenticated,
  upload.single("profileImage"),
  updateProfileController,
);

export default router;
