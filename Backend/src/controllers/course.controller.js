
import mongoose from "mongoose";
import Course from "../models/course.model.js";

// Create Course
// POST /api/courses

const createCourse = async (req, res) => {
    try {
        const instructorId = req.user?.userId;

        if (!instructorId) {
            return res.status(401).json({
                success: false,
                message: "Instructor ID not found in token"
            });
        }

        const course = await Course.create({
            ...req.body,
            instructor: instructorId,
            status: "Draft"
        });

        return res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: course
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// Get Instructor's Own Courses
// GET /api/courses/mine

const getMyCourses = async (req, res) => {
    try {
        const instructorId = req.user?.userId;

        if (!instructorId) {
            return res.status(401).json({
                success: false,
                message: "Instructor authentication is required"
            });
        }

        const courses = await Course.find({
            instructor: instructorId
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Instructor courses fetched successfully",
            count: courses.length,
            data: courses
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get Course By ID
// GET /api/courses/:courseId

const getCourseById = async (req, res) => {
    try {
        const { courseId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid course ID"
            });
        }

        const course = await Course.findOne({
            _id: courseId,
            status: "Published"
        });

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Published course not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course details fetched successfully",
            data: course
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Update Course
// PATCH /api/courses/:courseId

const updateCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const instructorId = req.user?.userId;

        if (!instructorId) {
            return res.status(401).json({
                success: false,
                message: "Instructor authentication is required"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid course ID"
            });
        }

        const allowedFields = [
            "title",
            "description",
            "category",
            "difficultyLevel",
            "duration",
            "price"
        ];

        const updateData = {};

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        });

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No valid fields provided for update"
            });
        }

        const course = await Course.findOneAndUpdate(
            {
                _id: courseId,
                instructor: instructorId
            },
            {
                $set: updateData
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found or you are not authorized"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: course
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// Delete Course
// DELETE /api/courses/:courseId

const deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const instructorId = req.user?.userId;

        if (!instructorId) {
            return res.status(401).json({
                success: false,
                message: "Instructor authentication is required"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid course ID"
            });
        }

        const course = await Course.findOneAndDelete({
            _id: courseId,
            instructor: instructorId
        });

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found or you are not authorized"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Publish Course
// PATCH /api/courses/:courseId/publish

const publishCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const instructorId = req.user?.userId;

        if (!instructorId) {
            return res.status(401).json({
                success: false,
                message: "Instructor authentication is required"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid course ID"
            });
        }

        const course = await Course.findOne({
            _id: courseId,
            instructor: instructorId
        });

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found or you are not authorized"
            });
        }

        // Business rule: required details must exist before publishing
        if (
            !course.title ||
            !course.description ||
            !course.category ||
            !course.difficultyLevel ||
            !course.duration ||
            course.price == null
        ) {
            return res.status(400).json({
                success: false,
                message: "Complete course details before publishing"
            });
        }

        course.status = "Published";

        await course.save();

        return res.status(200).json({
            success: true,
            message: "Course published successfully",
            data: course
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// Export Controllers

export {
    createCourse,
    getMyCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    publishCourse
};
