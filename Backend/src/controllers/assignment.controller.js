
import mongoose from "mongoose";
import Assignment from "../models/assignment.model.js";
import Module from "../models/module.model.js";
import Course from "../models/course.model.js";
import { HttpStatusCode } from "../constants/httpStatus.js";
import { Messages } from "../constants/messages.js";

// ALLOWED FIELDS
const allowedFields = [
  "title",
  "instruction",
  "url",
  "format",
  "duration",
  "level",
  "totalMarks",
  "passingMarks",
  "status",
  "deadline",
];

// VERIFY MODULE OWNERSHIP
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

// 1. CREATE ASSIGNMENT
const createAssignment = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const instructorId = req.user?.userId;

    // Check instructor authentication
    if (!instructorId) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: Messages.INSTRUCTOR_ID_NOT_FOUND,
      });
    }

    // Validate module ID
    if (!mongoose.Types.ObjectId.isValid(moduleId)) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: Messages.INVALID_MODULE_ID,
      });
    }

    // Verify module ownership
    const result = await verifyModuleOwnership(
      moduleId,
      instructorId
    );

    if (result.error === "MODULE_NOT_FOUND") {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: Messages.ASSIGNMENT_MODULE_NOT_FOUND,
      });
    }

    if (result.error === "UNAUTHORIZED") {
      return res.status(HttpStatusCode.FORBIDDEN).json({
        success: false,
        message: Messages.ASSIGNMENT_UNAUTHORIZED,
      });
    }

    // Collect allowed fields only
    const assignmentData = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        assignmentData[field] = req.body[field];
      }
    });

    // Generate automatic assignment order
    const lastAssignment = await Assignment.findOne({
      moduleId,
    }).sort({ order: -1 });

    const nextOrder = lastAssignment
      ? lastAssignment.order + 1
      : 1;

    // Create assignment
    const assignment = await Assignment.create({
      ...assignmentData,
      moduleId,
      order: nextOrder,
    });

    return res.status(HttpStatusCode.CREATED).json({
      success: true,
      message: Messages.ASSIGNMENT_CREATED,
      data: assignment,
    });
  } catch (error) {
    console.error("Create Assignment Error:", error);

    const isValidationError =
      error.name === "ValidationError" ||
      error.name === "CastError";

    return res
      .status(
        isValidationError
          ? HttpStatusCode.BAD_REQUEST
          : HttpStatusCode.INTERNAL_SERVER_ERROR
      )
      .json({
        success: false,
        message: isValidationError
          ? error.message
          : Messages.ASSIGNMENT_CREATION_FAILED,
      });
  }
};

// 2. GET ALL ASSIGNMENTS BY MODULE ID
const getAssignmentsByModule = async (req, res) => {
  try {
    const { moduleId } = req.params;

    // Validate module ID
    if (!mongoose.Types.ObjectId.isValid(moduleId)) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: Messages.INVALID_MODULE_ID,
      });
    }

    // Check module existence
    const module = await Module.findById(moduleId);

    if (!module) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: Messages.ASSIGNMENT_MODULE_NOT_FOUND,
      });
    }

    // Fetch assignments
    const assignments = await Assignment.find({
      moduleId,
    }).sort({
      order: 1,
      createdAt: 1,
    });

    return res.status(HttpStatusCode.SUCCESS).json({
      success: true,
      message: Messages.ASSIGNMENT_FETCHED,
      count: assignments.length,
      data: assignments,
    });
  } catch (error) {
    console.error("Get Assignments Error:", error);

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: Messages.ASSIGNMENT_FETCH_FAILED,
    });
  }
};

// 3. GET ASSIGNMENT BY ID
const getAssignmentById = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    // Validate assignment ID
    if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: Messages.INVALID_ID,
      });
    }

    // Find assignment
    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: Messages.ASSIGNMENT_NOT_FOUND,
      });
    }

    return res.status(HttpStatusCode.SUCCESS).json({
      success: true,
      message: Messages.ASSIGNMENT_FETCHED,
      data: assignment,
    });
  } catch (error) {
    console.error("Get Assignment By ID Error:", error);

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: Messages.ASSIGNMENT_FETCH_FAILED,
    });
  }
};

// EXPORT CONTROLLERS
export {
  createAssignment,
  getAssignmentsByModule,
  getAssignmentById,
};
