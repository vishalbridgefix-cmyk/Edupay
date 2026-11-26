import mongoose from "mongoose";
import Course from "../models/course.model.js";
import Module from "../models/module.model.js";
import { HttpStatusCode } from "../constants/httpStatus.js";
import { Messages } from "../constants/messages.js";

// Create Module
const createModule = async (req, res) => {
  try {
    const { courseId } = req.params;
    const instructorId = req.user?.userId;
    const { title, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: Messages.INVALID_COURSE_ID,
      });
    }

    const course = await Course.findById(courseId);

    if (!course || course.instructor.toString() !== instructorId.toString()) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: Messages.COURSE_NOT_FOUND_OR_UNAUTHORIZED,
      });
    }

    // Append at the end of the outline
    const lastModule = await Module.findOne({ courseId })
      .sort({ order: -1 })
      .select("order");

    const moduleDoc = await Module.create({
      courseId,
      title,
      description,
      order: lastModule ? lastModule.order + 1 : 1,
    });

    return res.status(HttpStatusCode.CREATED).json({
      success: true,
      message: Messages.MODULE_CREATED,
      data: moduleDoc,
    });
  } catch (error) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Course Modules
const getCourseModules = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user?.userId;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: Messages.INVALID_COURSE_ID,
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: Messages.COURSE_NOT_FOUND,
      });
    }

    // Owner can always view, others only if published
    const isOwner = course.instructor.toString() === userId?.toString();

    if (!isOwner && course.status !== "Published") {
      return res.status(HttpStatusCode.FORBIDDEN).json({
        success: false,
        message: Messages.COURSE_VIEW_FORBIDDEN,
      });
    }

    const modules = await Module.find({ courseId }).sort({ order: 1 });

    return res.status(HttpStatusCode.SUCCESS).json({
      success: true,
      message: Messages.MODULES_FETCHED,
      count: modules.length,
      data: modules,
    });
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Module
const updateModule = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const instructorId = req.user?.userId;

    if (!mongoose.Types.ObjectId.isValid(moduleId)) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: Messages.INVALID_MODULE_ID,
      });
    }

    const moduleDoc = await Module.findById(moduleId);

    if (!moduleDoc) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: Messages.MODULE_NOT_FOUND,
      });
    }

    const course = await Course.findById(moduleDoc.courseId);

    if (!course || course.instructor.toString() !== instructorId.toString()) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: Messages.COURSE_NOT_FOUND_OR_UNAUTHORIZED,
      });
    }

    Object.assign(moduleDoc, req.body);
    await moduleDoc.save();

    return res.status(HttpStatusCode.SUCCESS).json({
      success: true,
      message: Messages.MODULE_UPDATED,
      data: moduleDoc,
    });
  } catch (error) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Module
const deleteModule = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const instructorId = req.user?.userId;

    if (!mongoose.Types.ObjectId.isValid(moduleId)) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: Messages.INVALID_MODULE_ID,
      });
    }

    const moduleDoc = await Module.findById(moduleId);

    if (!moduleDoc) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: Messages.MODULE_NOT_FOUND,
      });
    }

    const course = await Course.findById(moduleDoc.courseId);

    if (!course || course.instructor.toString() !== instructorId.toString()) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: Messages.COURSE_NOT_FOUND_OR_UNAUTHORIZED,
      });
    }

    await moduleDoc.deleteOne();

    // Keep ordering consistent after deletion
    await Module.updateMany(
      { courseId: moduleDoc.courseId, order: { $gt: moduleDoc.order } },
      { $inc: { order: -1 } },
    );

    return res.status(HttpStatusCode.SUCCESS).json({
      success: true,
      message: Messages.MODULE_DELETED,
    });
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

export { createModule, getCourseModules, updateModule, deleteModule };
