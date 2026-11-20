import express from "express";

import {
  logoutController,
  registerController,

  loginController,
} from "../controllers/auth.controller.js";

import { isAuthenticated } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/register", upload.single("profileImage"), registerController);

router.post("/login", loginController);

router.post("/logout", isAuthenticated, logoutController);


export default router;
