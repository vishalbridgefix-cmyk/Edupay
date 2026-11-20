import express from "express";

import courseRoutes from "./course.routes.js";
import userRoutes from "./user.routes.js"
import authRoutes from "./auth.routes.js"

const router = express.Router();

//Course route
router.use("/courses", courseRoutes);
router.use("/users", userRoutes);
router.use("/auth",authRoutes)


export default router;
