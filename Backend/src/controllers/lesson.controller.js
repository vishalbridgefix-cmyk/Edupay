import mongoose from "mongoose";
import Lesson from "../models/lesson.model.js";
//import Module from "../models/module.model.js";
import Course from "../models/course.model.js";
import { HttpStatusCode } from "../constants/httpStatus.js";
import { Messages } from "../constants/messages.js";

const allowedFields = [
  "title",
  "description",
  "format",
  "videoUrl",
  "notes",
  "duration",
  "difficulty",
  "previewAccess",
  "completionRule",
];

const validateLessonData = (format, videoUrl) => {
  const validFormats = ["video", "article", "slides", "resources"];

  if (!validFormats.includes(format)) {
    return "Invalid lesson format";
  }

  if (
    format === "video" &&
    (typeof videoUrl !== "string" || !videoUrl.trim())
  ) {
    return "Video URL is required for video lessons";
  }

  return null;
};


const verifyModuleOwnership = async (moduleId, instructorId) => {
  const module = await Module.findById(moduleId);

  if (!module) {
    return { error: "MODULE_NOT_FOUND" };
  }

  const course = await Course.findOne({
    _id: module.courseId,
    instructor: instructorId,
  });

  if (!course) {
    return { error: "UNAUTHORIZED" };
  }

  return { module, course };
};

// CREATE LESSON
const createLesson = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const instructorId = req.user?.userId;

    if (!instructorId) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: Messages.INSTRUCTOR_ID_NOT_FOUND,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(moduleId)) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: Messages.INVALID_ID,
      });
    }

    // Verify module ownership
    const result = await verifyModuleOwnership(moduleId, instructorId);

    if (result.error === "MODULE_NOT_FOUND") {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: Messages.LESSON_MODULE_NOT_FOUND,
      });
    }

    if (result.error === "UNAUTHORIZED") {
      return res.status(HttpStatusCode.FORBIDDEN).json({
        success: false,
        message: Messages.LESSON_UNAUTHORIZED,
      });
    }

    // Collect allowed fields only
    const lessonData = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        lessonData[field] = req.body[field];
      }
    });

    const format = lessonData.format || "article";

    // Validate format and video URL
    const validationError = validateLessonData(format, lessonData.videoUrl);

    if (validationError) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: validationError,
      });
    }

    // Clear video URL for non-video lessons
    if (format !== "video") {
      lessonData.videoUrl = "";
    }

    // Generate automatic lesson order
    const lastLesson = await Lesson.findOne({ moduleId }).sort({ order: -1 });

    const nextOrder = lastLesson ? lastLesson.order + 1 : 1;

    // Create lesson
    const lesson = await Lesson.create({
      ...lessonData,
      moduleId,
      order: nextOrder,
    });

    return res.status(HttpStatusCode.CREATED).json({
      success: true,
      message: Messages.LESSON_CREATED,
      data: lesson,
    });
  } catch (error) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL LESSONS BY MODULE ID
const getLessonsByModule = async (req, res) => {
  try {
    const { moduleId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(moduleId)) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: Messages.INVALID_ID,
      });
    }

    const module = await Module.findById(moduleId);

    if (!module) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: Messages.LESSON_MODULE_NOT_FOUND,
      });
    }

    const lessons = await Lesson.find({ moduleId }).sort({
      order: 1,
      createdAt: 1,
    });

    return res.status(HttpStatusCode.SUCCESS).json({
      success: true,
      message: Messages.LESSON_FETCHED,
      count: lessons.length,
      data: lessons,
    });
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

// GET LESSON BY ID
const getLessonById = async (req, res) => {
  try {
    const { lessonId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(lessonId)) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: Messages.INVALID_ID,
      });
    }

    const lesson = await Lesson.findById(lessonId);

    if (!lesson) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: Messages.LESSON_NOT_FOUND,
      });
    }

    return res.status(HttpStatusCode.SUCCESS).json({
      success: true,
      message: Messages.LESSON_FETCHED,
      data: lesson,
    });
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE LESSON
const updateLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const instructorId = req.user?.userId;

    if (!instructorId) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: Messages.INSTRUCTOR_AUTH_REQUIRED,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(lessonId)) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: Messages.INVALID_ID,
      });
    }

    const lesson = await Lesson.findById(lessonId);

    if (!lesson) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: Messages.LESSON_NOT_FOUND,
      });
    }

    // Verify instructor ownership
    const result = await verifyModuleOwnership(lesson.moduleId, instructorId);

    if (result.error === "MODULE_NOT_FOUND") {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: Messages.LESSON_MODULE_NOT_FOUND,
      });
    }

    if (result.error === "UNAUTHORIZED") {
      return res.status(HttpStatusCode.FORBIDDEN).json({
        success: false,
        message: Messages.LESSON_UNAUTHORIZED,
      });
    }

    // Collect allowed update fields
    const updateData = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    if (Object.keys(updateData).length === 0) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: Messages.NO_VALID_FIELDS,
      });
    }

    // Determine final format and video URL
    const finalFormat = updateData.format ?? lesson.format;

    const finalVideoUrl =
      updateData.videoUrl !== undefined ? updateData.videoUrl : lesson.videoUrl;

    // Validate format and video URL
    const validationError = validateLessonData(finalFormat, finalVideoUrl);

    if (validationError) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: validationError,
      });
    }

    // Clear video URL when changing to another format
    if (finalFormat !== "video") {
      updateData.videoUrl = "";
    }

    // Update document and run validators
    Object.assign(lesson, updateData);

    const updatedLesson = await lesson.save();

    return res.status(HttpStatusCode.SUCCESS).json({
      success: true,
      message: Messages.LESSON_UPDATED,
      data: updatedLesson,
    });
  } catch (error) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE LESSON
const deleteLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const instructorId = req.user?.userId;

    if (!instructorId) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: Messages.INSTRUCTOR_AUTH_REQUIRED,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(lessonId)) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: Messages.INVALID_ID,
      });
    }

    const lesson = await Lesson.findById(lessonId);

    if (!lesson) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: Messages.LESSON_NOT_FOUND,
      });
    }

    // Verify instructor ownership
    const result = await verifyModuleOwnership(lesson.moduleId, instructorId);

    if (result.error === "MODULE_NOT_FOUND") {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: Messages.LESSON_MODULE_NOT_FOUND,
      });
    }

    if (result.error === "UNAUTHORIZED") {
      return res.status(HttpStatusCode.FORBIDDEN).json({
        success: false,
        message: Messages.LESSON_UNAUTHORIZED,
      });
    }

    const moduleId = lesson.moduleId;
    const deletedOrder = lesson.order;

    // Delete lesson
    await Lesson.findByIdAndDelete(lessonId);

    // Reorder remaining lessons
    await Lesson.updateMany(
      {
        moduleId,
        order: { $gt: deletedOrder },
      },
      {
        $inc: { order: -1 },
      },
    );

    return res.status(HttpStatusCode.SUCCESS).json({
      success: true,
      message: Messages.LESSON_DELETED,
    });
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

// EXPORT CONTROLLERS
export {
  createLesson,
  getLessonsByModule,
  getLessonById,
  updateLesson,
  deleteLesson,
};
