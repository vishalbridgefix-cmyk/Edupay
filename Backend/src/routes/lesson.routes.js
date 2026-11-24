
import express from "express";
import * as lessonController from "../controllers/lesson.controller.js";

import {
    isAuthenticated,
    instructorMiddleware
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Lesson
router.post(
    "/:moduleId",
    isAuthenticated,
    instructorMiddleware,
    lessonController.createLesson
);

// Get All Lessons By Module ID
router.get(
    "/:moduleId",
    lessonController.getLessonsByModule
);

// Get Lesson By ID
router.get(
    "/:lessonId",
    lessonController.getLessonById
);

// Update Lesson
router.patch(
    "/:lessonId",
    isAuthenticated,
    instructorMiddleware,
    lessonController.updateLesson
);

// Delete Lesson
router.delete(
    "/:lessonId",
    isAuthenticated,
    instructorMiddleware,
    lessonController.deleteLesson
);

export default router;
