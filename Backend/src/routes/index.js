import express from "express";

import courseRoutes from "./course.routes.js";
import userRoutes from "./user.routes.js"
import authRoutes from "./auth.routes.js"
import uploadRoutes from './upload.routes.js'


const router = express.Router();

//Course route

router.use("/instructor/courses", courseRoutes);
router.use("/users", userRoutes);
router.use("/auth",authRoutes)
router.use("/api/upload", uploadRoutes);


export default router;
