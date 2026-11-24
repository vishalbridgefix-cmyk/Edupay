
import express from "express";

import {
  getDashboardOverview,
  getContinueLearning,
  getUpcomingSchedule,
  getRecommendedCourses,
} from "../controllers/learnerDashboard.controller.js";

import {
  isAuthenticated,
  learnerMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();


router.get(
  "/overview",
  isAuthenticated,
  learnerMiddleware,
  getDashboardOverview
);

router.get(
  "/continue-learning",
  isAuthenticated,
  learnerMiddleware,
  getContinueLearning
);


router.get(
  "/upcoming-schedule",
  isAuthenticated,
  learnerMiddleware,
  getUpcomingSchedule
);

router.get(
  "/recommended-courses",
  isAuthenticated,
  learnerMiddleware,
  getRecommendedCourses
);

export default router;
