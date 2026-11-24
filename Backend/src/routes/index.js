import express from "express";

import courseRoutes from "./course.routes.js";
import userRoutes from "./user.routes.js"
import authRoutes from "./auth.routes.js"
import lessonRoutes from './lesson.routes.js'
import uploadRoutes from './upload.routes.js'


const router = express.Router();

//Course route

router.use("/auth",authRoutes)
router.use("/users", userRoutes);
router.use("/instructor/courses", courseRoutes);
router.use("/instructor/lessons",lessonRoutes)
router.use("/upload", uploadRoutes);


export default router;
