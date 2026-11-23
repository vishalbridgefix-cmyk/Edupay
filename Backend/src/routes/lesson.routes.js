
import express from "express";
import * as lessonController from "../controllers/lesson.controller.js";

import {
    isAuthenticated,
    instructorMiddleware
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Lesson
router.post(
    "/modules/:moduleId/lessons",
    isAuthenticated,
    instructorMiddleware,
    lessonController.createLesson
);

// Get All Lessons By Module ID
router.get(
    "/modules/:moduleId/lessons",
    lessonController.getLessonsByModule
);

// Get Lesson By ID
router.get(
    "/lessons/:lessonId",
    lessonController.getLessonById
);

// Update Lesson
router.patch(
    "/lessons/:lessonId",
    isAuthenticated,
    instructorMiddleware,
    lessonController.updateLesson
);

// Delete Lesson
router.delete(
    "/lessons/:lessonId",
    isAuthenticated,
    instructorMiddleware,
    lessonController.deleteLesson
);

export default router;
