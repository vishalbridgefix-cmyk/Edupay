import express from "express";

import courseRoutes from "./course.routes.js";
import userRoutes from "./user.routes.js"

const router = express.Router();

//Course route
router.use("/courses", courseRoutes);
router.use("/users", userRoutes);

export default router;
