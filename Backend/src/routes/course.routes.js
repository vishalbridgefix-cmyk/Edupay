import express from "express";
import * as courseController from "../controllers/course.controller.js";
import {
  validateCourse,
  validateUpdateCourse
} from "../validations/course.validation.js";

import {
  isAuthenticated,
  instructorMiddleware
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Course
router.post(
  "/",
  isAuthenticated,
  instructorMiddleware,
  validateCourse,
  courseController.createCourse
);

// Get Instructor's Own Courses
router.get(
  "/mine",
  isAuthenticated,
  instructorMiddleware,
  courseController.getMyCourses
);

// Get Course Details
router.get(
  "/:courseId",
  courseController.getCourseById
);

// Update Course
router.patch(
  "/:courseId",
  isAuthenticated,
  instructorMiddleware,
  validateUpdateCourse,
  courseController.updateCourse
);

// Delete Course
router.delete(
  "/:courseId",
  isAuthenticated,
  instructorMiddleware,
  courseController.deleteCourse
);

// Publish Course
router.patch(
  "/:courseId/publish",
  isAuthenticated,
  instructorMiddleware,
  courseController.publishCourse
);

export default router;
