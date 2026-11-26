import express from "express";
import * as courseController from "../controllers/course.controller.js";

import {
  validateCourse,
  validateUpdateCourse,
} from "../validations/course.validation.js";


import {
  isAuthenticated,
  instructorMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Edupay Course Management APIs
 */

/**
 * @swagger
 * /api/instructor/courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *             description: Course details required by course validation
 *     responses:
 *       201:
 *         description: Course created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

// Create Course
router.post(
  "/",
  isAuthenticated,
  instructorMiddleware,
  validateCourse,
  courseController.createCourse,
);

/**
 * @swagger
 * /api/instructor/courses:
 *   get:
 *     summary: Get all published courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Published courses fetched successfully
 *       500:
 *         description: Internal server error
 */

// Get All Published Courses (Public API)
router.get("/", courseController.getAllCourses);

/**
 * @swagger
 * /api/instructor/courses/getCourses:
 *   get:
 *     summary: Get instructor's own courses
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Instructor courses fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

// Get Instructor's Own Courses
router.get(
  "/getCourses",
  isAuthenticated,
  instructorMiddleware,
  courseController.getMyCourses,
);

/**
 * @swagger
 * /api/instructor/courses/{courseId}:
 *   get:
 *     summary: Get course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: MongoDB course ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course fetched successfully
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */

// Get Course By ID
router.get("/:courseId", courseController.getCourseById);

/**
 * @swagger
 * /api/instructor/courses/{courseId}:
 *   patch:
 *     summary: Update an existing course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: MongoDB course ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *             description: Course fields to update
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Course not found
 */

// Update Course
router.patch(
  "/:courseId",
  isAuthenticated,
  instructorMiddleware,
  validateUpdateCourse,
  courseController.updateCourse,
);

/**
 * @swagger
 * /api/instructor/courses/{courseId}:
 *   delete:
 *     summary: Delete a course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: MongoDB course ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Course not found
 */

// Delete Course
router.delete(
  "/:courseId",
  isAuthenticated,
  instructorMiddleware,
  courseController.deleteCourse,
);

/**
 * @swagger
 * /api/instructor/courses/{courseId}/publish:
 *   patch:
 *     summary: Publish a course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course published successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Course not found
 */

// Publish Course
router.patch(
  "/:courseId/publish",
  isAuthenticated,
  instructorMiddleware,
  courseController.publishCourse,
);

/**
 * @swagger
 * /api/instructor/courses/{courseId}/draft:
 *   patch:
 *     summary: Move a published course to draft
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course moved to draft successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Course not found
 */

// Move Course to Draft
router.patch(
  "/:courseId/draft",
  isAuthenticated,
  instructorMiddleware,
  courseController.draftCourse,
);


export default router;
