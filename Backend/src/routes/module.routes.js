import express from "express";
import {
  isAuthenticated,
  instructorMiddleware,
} from "../middleware/authMiddleware.js";
import {
  updateModule,
  deleteModule,
} from "../controllers/module.controller.js";
import {
  validateUpdateModule,
} from "../validations/module.validation.js";

const router = express.Router();


// Update Module
router.patch(
  "/:moduleId",
  isAuthenticated,
  instructorMiddleware,
  validateUpdateModule,
  updateModule,
);

// Delete Module
router.delete(
  "/:moduleId",
  isAuthenticated,
  instructorMiddleware,
  deleteModule,
);

export default router;
