import mongoose from "mongoose";
import Lesson from "../models/lesson.model.js";
// import Module from "../models/module.model.js";
import Course from "../models/course.model.js";
import { HttpStatusCode } from "../constants/httpStatus.js";
import { Messages } from "../constants/messages.js";


// Create Lesson
const createLesson = async (req, res) => {
    try {
        const { moduleId } = req.params;
        const instructorId = req.user?.userId;

        if (!instructorId) {
            return res.status(HttpStatusCode.UNAUTHORIZED).json({
                success: false,
                message: Messages.INSTRUCTOR_ID_NOT_FOUND
            });
        }

        if (!mongoose.Types.ObjectId.isValid(moduleId)) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({
                success: false,
                message: Messages.INVALID_ID
            });
        }

        const module = await Module.findById(moduleId);

        if (!module) {
            return res.status(HttpStatusCode.NOT_FOUND).json({
                success: false,
                message: Messages.LESSON_MODULE_NOT_FOUND
            });
        }

        // Check module ownership
        const course = await Course.findOne({
            _id: module.courseId,
            instructor: instructorId
        });

        if (!course) {
            return res.status(HttpStatusCode.FORBIDDEN).json({
                success: false,
                message: Messages.LESSON_UNAUTHORIZED
            });
        }

        // Automatically generate lesson order
        const lastLesson = await Lesson.findOne({ moduleId })
            .sort({ order: -1 });

        const nextOrder = lastLesson ? lastLesson.order + 1 : 1;

        // Create lesson
        const lesson = await Lesson.create({
            ...req.body,
            moduleId,
            order: nextOrder
        });

        return res.status(HttpStatusCode.CREATED).json({
            success: true,
            message: Messages.LESSON_CREATED,
            data: lesson
        });

    } catch (error) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
            success: false,
            message: error.message
        });
    }
};


// Get All Lessons By Module ID
const getLessonsByModule = async (req, res) => {
    try {
        const { moduleId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(moduleId)) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({
                success: false,
                message: Messages.INVALID_ID
            });
        }

        const module = await Module.findById(moduleId);

        if (!module) {
            return res.status(HttpStatusCode.NOT_FOUND).json({
                success: false,
                message: Messages.LESSON_MODULE_NOT_FOUND
            });
        }

        const lessons = await Lesson.find({ moduleId })
            .sort({ order: 1, createdAt: 1 });

        return res.status(HttpStatusCode.SUCCESS).json({
            success: true,
            message: Messages.LESSON_FETCHED,
            count: lessons.length,
            data: lessons
        });

    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        });
    }
};


// Get Lesson By ID
const getLessonById = async (req, res) => {
    try {
        const { lessonId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(lessonId)) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({
                success: false,
                message: Messages.INVALID_ID
            });
        }

        const lesson = await Lesson.findById(lessonId);

        if (!lesson) {
            return res.status(HttpStatusCode.NOT_FOUND).json({
                success: false,
                message: Messages.LESSON_NOT_FOUND
            });
        }

        return res.status(HttpStatusCode.SUCCESS).json({
            success: true,
            message: Messages.LESSON_FETCHED,
            data: lesson
        });

    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        });
    }
};


// Update Lesson
const updateLesson = async (req, res) => {
    try {
        const { lessonId } = req.params;
        const instructorId = req.user?.userId;

        if (!instructorId) {
            return res.status(HttpStatusCode.UNAUTHORIZED).json({
                success: false,
                message: Messages.INSTRUCTOR_AUTH_REQUIRED
            });
        }

        if (!mongoose.Types.ObjectId.isValid(lessonId)) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({
                success: false,
                message: Messages.INVALID_ID
            });
        }

        const lesson = await Lesson.findById(lessonId);

        if (!lesson) {
            return res.status(HttpStatusCode.NOT_FOUND).json({
                success: false,
                message: Messages.LESSON_NOT_FOUND
            });
        }

        const module = await Module.findById(lesson.moduleId);

        if (!module) {
            return res.status(HttpStatusCode.NOT_FOUND).json({
                success: false,
                message: Messages.LESSON_MODULE_NOT_FOUND
            });
        }

        // Verify course ownership through module
        const course = await Course.findOne({
            _id: module.courseId,
            instructor: instructorId
        });

        if (!course) {
            return res.status(HttpStatusCode.FORBIDDEN).json({
                success: false,
                message: Messages.LESSON_UNAUTHORIZED
            });
        }

        const allowedFields = [
            "title",
            "description",
            "contentType",
            "content",
            "videoUrl",
            "duration",
            "order",
            "resources"
        ];

        const updateData = {};

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        });

        if (Object.keys(updateData).length === 0) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({
                success: false,
                message: Messages.NO_VALID_FIELDS
            });
        }

        const updatedLesson = await Lesson.findByIdAndUpdate(
            lessonId,
            { $set: updateData },
            {
                new: true,
                runValidators: true
            }
        );

        return res.status(HttpStatusCode.SUCCESS).json({
            success: true,
            message: Messages.LESSON_UPDATED,
            data: updatedLesson
        });

    } catch (error) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
            success: false,
            message: error.message
        });
    }
};



const deleteLesson = async (req, res) => {
    try {
        const { lessonId } = req.params;
        const instructorId = req.user?.userId;

        if (!instructorId) {
            return res.status(HttpStatusCode.UNAUTHORIZED).json({
                success: false,
                message: Messages.INSTRUCTOR_AUTH_REQUIRED
            });
        }

        if (!mongoose.Types.ObjectId.isValid(lessonId)) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({
                success: false,
                message: Messages.INVALID_ID
            });
        }

        const lesson = await Lesson.findById(lessonId);

        if (!lesson) {
            return res.status(HttpStatusCode.NOT_FOUND).json({
                success: false,
                message: Messages.LESSON_NOT_FOUND
            });
        }

        const module = await Module.findById(lesson.moduleId);

        if (!module) {
            return res.status(HttpStatusCode.NOT_FOUND).json({
                success: false,
                message: Messages.LESSON_MODULE_NOT_FOUND
            });
        }

        // Verify course ownership
        const course = await Course.findOne({
            _id: module.courseId,
            instructor: instructorId
        });

        if (!course) {
            return res.status(HttpStatusCode.FORBIDDEN).json({
                success: false,
                message: Messages.LESSON_UNAUTHORIZED
            });
        }

        const moduleId = lesson.moduleId;
        const deletedOrder = lesson.order;

        // Delete lesson
        await Lesson.findByIdAndDelete(lessonId);

        // Decrease order of all lessons after deleted lesson
        await Lesson.updateMany(
            {
                moduleId,
                order: { $gt: deletedOrder }
            },
            {
                $inc: { order: -1 }
            }
        );

        return res.status(HttpStatusCode.SUCCESS).json({
            success: true,
            message: Messages.LESSON_DELETED
        });

    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        });
    }
};



// Export Controllers
export {
    createLesson,
    getLessonsByModule,
    getLessonById,
    updateLesson,
    deleteLesson
};
