import express from "express";

import {
  getProfileController,
  updateProfileController,
} from "../controllers/user.controller.js";

import { isAuthenticated } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();



router.get("/getProfile", isAuthenticated, getProfileController);

router.patch(
  "/updateProfile",
  isAuthenticated,
  upload.single("profileImage"),
  updateProfileController,
);

export default router;
