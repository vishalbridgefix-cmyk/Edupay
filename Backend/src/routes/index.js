import express from "express";

import courseRoutes from "./course.routes.js";
import userRoutes from "./user.routes.js"
import authRoutes from "./auth.routes.js"
import lessonRoutes from './lesson.routes.js'

const router = express.Router();

//Course route

router.use("/auth",authRoutes)
router.use("/users", userRoutes);
router.use("/instructor/courses", courseRoutes);
router.use("/instructor/lessons",lessonRoutes)


export default router;
