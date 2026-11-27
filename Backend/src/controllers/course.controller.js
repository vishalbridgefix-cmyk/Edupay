import mongoose from "mongoose";
import Course from "../models/course.model.js";
import { HttpStatusCode } from "../constants/httpStatus.js";
import { Messages } from "../constants/messages.js";

// Create Course
const createCourse = async (req, res) => {
  try {
    const instructorId = req.user?.userId;

    if (!instructorId) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: Messages.INSTRUCTOR_ID_NOT_FOUND,
      });
    }

    const course = await Course.create({
      ...req.body,
      thumbnail: req.body.thumbnail || "",
      instructor: instructorId,
      status: "Draft",
    });

    return res.status(HttpStatusCode.CREATED).json({
      success: true,
      message: Messages.COURSE_CREATED,
      data: course,
    });
  } catch (error) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Instructor's Own Courses
const getMyCourses = async (req, res) => {
  try {
    const instructorId = req.user?.userId;

    if (!instructorId) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: Messages.INSTRUCTOR_AUTH_REQUIRED,
      });
    }

    const courses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 });

    return res.status(HttpStatusCode.SUCCESS).json({
      success: true,
      message: Messages.INSTRUCTOR_COURSES_FETCHED,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Published Courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      status: "Published",
    }).sort({ createdAt: -1 });

    return res.status(HttpStatusCode.SUCCESS).json({
      success: true,
      message: Messages.ALL_COURSES_FETCHED,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Course By ID
const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;

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

    return res.status(HttpStatusCode.SUCCESS).json({
      success: true,
      message: Messages.COURSE_DETAILS_FETCHED,
      data: course,
    });
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Course
const updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const instructorId = req.user?.userId;

    if (!instructorId) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: Messages.INSTRUCTOR_AUTH_REQUIRED,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: Messages.INVALID_COURSE_ID,
      });
    }

    const existingCourse = await Course.findById(courseId);

    if (!existingCourse) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: Messages.COURSE_NOT_FOUND,
      });
    }

    if (existingCourse.instructor.toString() !== instructorId.toString()) {
      return res.status(HttpStatusCode.FORBIDDEN).json({
        success: false,
        message: Messages.NOT_AUTHORIZED,
      });
    }

    const allowedFields = [
      "title",
      "description",
      "category",
      "difficultyLevel",
      "duration",
      "price",
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
        message: Messages.NO_VALID_FIELDS,
      });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $set: updateData },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    return res.status(HttpStatusCode.SUCCESS).json({
      success: true,
      message: Messages.COURSE_UPDATED,
      data: updatedCourse,
    });
  } catch (error) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Course
const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const instructorId = req.user?.userId;

    if (!instructorId) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: Messages.INSTRUCTOR_AUTH_REQUIRED,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: Messages.INVALID_COURSE_ID,
      });
    }

    const course = await Course.findOneAndDelete({
      _id: courseId,
      instructor: instructorId,
    });

    if (!course) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: Messages.COURSE_NOT_FOUND_OR_UNAUTHORIZED,
      });
    }

    return res.status(HttpStatusCode.SUCCESS).json({
      success: true,
      message: Messages.COURSE_DELETED,
    });
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

// Publish Course (Draft -> Published)
const publishCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const instructorId = req.user?.userId;

    if (!instructorId) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: Messages.INSTRUCTOR_AUTH_REQUIRED,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: Messages.INVALID_COURSE_ID,
      });
    }

    const course = await Course.findOne({
      _id: courseId,
      instructor: instructorId,
    });

    if (!course) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: Messages.COURSE_NOT_FOUND_OR_UNAUTHORIZED,
      });
    }

    // Check required course details
    if (
      !course.title ||
      !course.description ||
      !course.category ||
      !course.difficultyLevel ||
      !course.duration ||
      course.price == null
    ) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: Messages.COMPLETE_COURSE_DETAILS,
      });
    }

    // Check current status
    if (course.status === "Published") {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: Messages.ALREADY_PUBLISHED,
      });
    }

    // Draft -> Published
    course.status = "Published";

    await course.save();

    return res.status(HttpStatusCode.SUCCESS).json({
      success: true,
      message: Messages.COURSE_PUBLISHED,
      data: course,
    });
  } catch (error) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

// Move Course to Draft (Published -> Draft)
const draftCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const instructorId = req.user?.userId;

    if (!instructorId) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: Messages.INSTRUCTOR_AUTH_REQUIRED,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: Messages.INVALID_COURSE_ID,
      });
    }

    const course = await Course.findOne({
      _id: courseId,
      instructor: instructorId,
    });

    if (!course) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: Messages.COURSE_NOT_FOUND_OR_UNAUTHORIZED,
      });
    }

    // Check current status
    if (course.status === "Draft") {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: Messages.ALREADY_IN_DRAFT,
      });
    }

    // Published -> Draft
    course.status = "Draft";

    await course.save();

    return res.status(HttpStatusCode.SUCCESS).json({
      success: true,
      message: Messages.MOVED_DRAFT_SUCCESSFULLY,
      data: course,
    });
  } catch (error) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

// Export Controllers
export {
  createCourse,
  getMyCourses,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  publishCourse,
  draftCourse,
};
