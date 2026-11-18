import express from 'express'
const router = express.Router();
import courseController from '../controllers/course.controller.js'
import validateCourse from '../validations/course.validation.js'

// Create Course
// POST /api/courses
router.post(
    "/",
    validateCourse,
    courseController.createCourse
);

// Get Instructor's Own Courses
// GET /api/courses/mine
router.get(
    "/mine",
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
    validateCourse,
    courseController.updateCourse
);

// Delete Course
// DELETE /api/courses/:courseId
router.delete(
    "/:courseId",
    courseController.deleteCourse
);

// Publish Course
// PATCH /api/courses/:courseId/publish
router.patch(
    "/:courseId/publish",
    courseController.publishCourse
);

export default router;
