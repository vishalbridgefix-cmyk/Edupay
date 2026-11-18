import express from "express";
import * as courseController from "../controllers/course.controller.js";
import { validateCourse } from "../validations/course.validation.js";
import {authMiddleware, instructorMiddleware} from '../middleware/authMiddleware.js'
import { validateUpdateCourse } from "../validations/course.validation.js";

const router = express.Router();

// Create Course
// POST /api/courses
router.post(
    "/",
    authMiddleware,
    instructorMiddleware,
    validateCourse,
    courseController.createCourse
);

// Get Instructor's Own Courses
// GET /api/courses/mine
router.get(
    "/mine",
    authMiddleware,
    instructorMiddleware,
    courseController.getMyCourses
);

// Get Course Details
// GET /api/courses/:courseId
router.get(
    "/:courseId",
    courseController.getCourseById
);

// Update Course
// PATCH /api/courses/:courseId
router.patch(
    "/:courseId",
    authMiddleware,
    instructorMiddleware,
    validateUpdateCourse,
    courseController.updateCourse
);

// Delete Course
// DELETE /api/courses/:courseId
router.delete(
    "/:courseId",
    authMiddleware,
    instructorMiddleware,
    courseController.deleteCourse
);

// Publish Course
// PATCH /api/courses/:courseId/publish
router.patch(
    "/:courseId/publish",
    authMiddleware,
    instructorMiddleware,
    courseController.publishCourse
);

export default router;
