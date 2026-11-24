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
  validateModule,
  validateUpdateModule,
} from "../validations/module.validation.js";
import * as moduleController from "../controllers/module.controller.js";

const router = express.Router();

// Create Module
router.post(
  "/create-module/:courseId",
  isAuthenticated,
  instructorMiddleware,
  validateModule,
  moduleController.createModule,
);

// Get All Modules of a Course
router.get(
  "/get-modules/:courseId",
  isAuthenticated,
  moduleController.getCourseModules,
);

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
