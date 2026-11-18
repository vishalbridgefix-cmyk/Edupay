import express from "express";

import courseRoutes from "./course.routes.js";

const router = express.Router();

//Course route
router.use("/courses", courseRoutes);

export default router;
