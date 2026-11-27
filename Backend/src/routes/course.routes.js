
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
 *     description: Create a new course by an authenticated instructor.
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - category
 *               - difficultyLevel
 *               - duration
 *             properties:
 *               title:
 *                 type: string
 *                 example: Full Stack Web Development
 *               description:
 *                 type: string
 *                 example: Learn frontend and backend development using HTML, CSS, JavaScript, React, Node.js, and MongoDB.
 *               thumbnail:
 *                 type: string
 *                 example: https://example.com/course-thumbnail.jpg
 *               category:
 *                 type: string
 *                 example: Web Development
 *               difficultyLevel:
 *                 type: string
 *                 enum: [Beginner, Intermediate, Advanced]
 *                 example: Beginner
 *               duration:
 *                 type: number
 *                 minimum: 1
 *                 example: 40
 *               price:
 *                 type: number
 *                 minimum: 0
 *                 example: 2999
 *     responses:
 *       201:
 *         description: Course created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
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
 *     description: Fetch all published courses.
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
 *     description: Fetch all courses created by the authenticated instructor.
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
 *       500:
 *         description: Internal server error
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
 *     description: Fetch a course using its MongoDB ID.
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: MongoDB course ID
 *         schema:
 *           type: string
 *           example: 674abc1234567890abcdef12
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
 *     description: Update course details using course ID.
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
 *           example: 674abc1234567890abcdef12
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Advanced Full Stack Web Development
 *               description:
 *                 type: string
 *                 example: Learn advanced frontend and backend development using React, Node.js, and MongoDB.
 *               thumbnail:
 *                 type: string
 *                 example: https://example.com/updated-thumbnail.jpg
 *               category:
 *                 type: string
 *                 example: Web Development
 *               difficultyLevel:
 *                 type: string
 *                 enum: [Beginner, Intermediate, Advanced]
 *                 example: Intermediate
 *               duration:
 *                 type: number
 *                 minimum: 1
 *                 example: 60
 *               price:
 *                 type: number
 *                 minimum: 0
 *                 example: 3999
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
 *       500:
 *         description: Internal server error
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
 *     description: Delete a course using its MongoDB ID.
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
 *           example: 674abc1234567890abcdef12
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
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
 * /api/instructor/courses/publish/{courseId}:
 *   patch:
 *     summary: Publish a course
 *     description: Change course status to Published.
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
 *           example: 674abc1234567890abcdef12
 *     responses:
 *       200:
 *         description: Course published successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */

// Publish Course
router.patch(
  "/publish/:courseId",
  isAuthenticated,
  instructorMiddleware,
  courseController.publishCourse,
);

/**
 * @swagger
 * /api/instructor/courses/draft/{courseId}:
 *   patch:
 *     summary: Move a published course to draft
 *     description: Change course status to Draft.
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
 *           example: 674abc1234567890abcdef12
 *     responses:
 *       200:
 *         description: Course moved to draft successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */

// Move Course to Draft
router.patch(
  "/draft/:courseId",
  isAuthenticated,
  instructorMiddleware,
  courseController.draftCourse,
);

export default router;
