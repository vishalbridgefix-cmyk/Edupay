
import express from "express";

import upload from "../middleware/multer.js";

import {
    uploadImage,
    uploadCourseThumbnail
} from "../controllers/upload.controller.js";

const router = express.Router();

// Profile Image Upload
router.post(
    "/image",
    upload.single("image"),
    uploadImage
);

// Course Thumbnail Upload
router.post(
    "/course-thumbnail",
    upload.single("thumbnail"),
    uploadCourseThumbnail
);

export default router;
