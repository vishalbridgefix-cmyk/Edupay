
const express = require("express");
const router = express.Router();

const courseController = require("../controllers/course.controller");

// Route for create course post route
// /api/courses
router.post(
    "/",
    courseController.createCourse
);


//For checking instructor course is present or not get method
// /api/courses/mine
router.get(
    "/mine",
    courseController.getMyCourses
);


// All course detail get route
// /api/courses/:courseId
router.get(
    "/:courseId",
    courseController.getCourseById
);


//Update course using id patch method
// /api/courses/:courseId
router.patch(
    "/:courseId",
    courseController.updateCourse
);


//Delete course delete method
// /api/courses/:courseId
router.delete(
    "/:courseId",
    courseController.deleteCourse
);


//Publish route using patch method
// /api/courses/:courseId/publish
router.patch(
    "/:courseId/publish",
    courseController.publishCourse
);

module.exports = router;
