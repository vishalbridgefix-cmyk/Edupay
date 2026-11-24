import mongoose from "mongoose";

import Enrollment from "../models/enrollement.model.js";
import LearningActivity from "../models/learningActivity.model.js";
import userModel from "../models/user.model.js";
import LearnerSchedule from "../models/learnerSchedule.model.js";
import Course from "../models/course.model.js";
import { HttpStatusCode } from "../constants/httpStatus.js";
import { Messages } from "../constants/messages.js";


// fetch overview API
export const getDashboardOverview = async (req, res) => {
  try {
    const learnerId = req.user?.userId;

    if (!learnerId || !mongoose.Types.ObjectId.isValid(learnerId)) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "Invalid learner authentication",
      });
    }

    const coursesInProgress = await Enrollment.countDocuments({
      learner: learnerId,
      status: "In Progress",
    });

    const completedCourses = await Enrollment.countDocuments({
      learner: learnerId,
      status: "Completed",
    });

    const learningActivities = await LearningActivity.find({
      learner: learnerId,
    }).select("durationMinutes activityDate");

    const totalMinutes = learningActivities.reduce(
      (total, activity) => total + activity.durationMinutes,
      0
    );

    const totalHoursLearned = Number((totalMinutes / 60).toFixed(1));

    const learningDates = learningActivities.map((activity) =>
      new Date(activity.activityDate).toISOString().slice(0, 10)
    );

    const uniqueLearningDates = learningDates.filter(
      (date, index) => learningDates.indexOf(date) === index
    );

    
    let currentLearningStreak = 0;

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);

    const todayString = today.toISOString().slice(0, 10);
    const yesterdayString = yesterday.toISOString().slice(0, 10);

    let currentDate;

    if (uniqueLearningDates.includes(todayString)) {
      currentDate = today;
    } else if (uniqueLearningDates.includes(yesterdayString)) {
      currentDate = yesterday;
    }

    while (currentDate) {
      const dateString = currentDate.toISOString().slice(0, 10);

      if (!uniqueLearningDates.includes(dateString)) {
        break;
      }

      currentLearningStreak++;
      currentDate.setUTCDate(currentDate.getUTCDate() - 1);
    }

    return res.status(HttpStatusCode.SUCCESS).json({
      success: true,
      message: "Learner dashboard overview fetched successfully",
      data: {
        coursesInProgress,
        totalHoursLearned,
        completedCourses,
        currentLearningStreak,
      },
    });
  } catch (error) {
    console.error("Dashboard Overview Error:", error);

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: Messages.INTERNAL_SERVER_ERROR,
    });
  }
};

//continue Learning API

export const getContinueLearning = async (req, res) => {
  try {
    const learnerId = req.user?.userId;

    if (!learnerId || !mongoose.Types.ObjectId.isValid(learnerId)) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "Invalid learner authentication",
      });
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;

    if (
      !Number.isInteger(page) ||
      !Number.isInteger(limit) ||
      page < 1 ||
      limit < 1 ||
      limit > 50
    ) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Invalid pagination parameters",
      });
    }

    const skip = (page - 1) * limit;

    const enrollments = await Enrollment.find({
      learner: learnerId,
      status: "In Progress",
    })
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "course",
        select: "title category thumbnail lessons instructor",
        populate: {
          path: "instructor",
          model: userModel,
          select: "fullName",
        },
      });

    const totalEnrollments = await Enrollment.countDocuments({
      learner: learnerId,
      status: "In Progress",
    });

    const courses = enrollments
      .filter((enrollment) => enrollment.course)
      .map((enrollment) => {
        const course = enrollment.course;

        const totalLessons = course.lessons?.length || 0;
        const completedLessons = enrollment.completedLessons?.length || 0;

        let learningProgress = 0;

        if (totalLessons > 0) {
          learningProgress = Math.round(
            (completedLessons / totalLessons) * 100
          );

          if (learningProgress > 100) {
            learningProgress = 100;
          }
        }

        return {
          courseId: course._id,
          courseTitle: course.title,
          courseCategory: course.category,
          instructorName: course.instructor?.fullName || "Unknown Instructor",
          totalLessons,
          completedLessons,
          learningProgress,
          courseThumbnail: course.thumbnail,
        };
      });

    return res.status(HttpStatusCode.SUCCESS).json({
      success: true,
      message: "Continue learning courses fetched successfully",
      data: courses,
      pagination: {
        totalRecords: totalEnrollments,
        currentPage: page,
        totalPages: Math.ceil(totalEnrollments / limit),
        limit,
      },
    });
  } catch (error) {
    console.error("Continue Learning Error:", error);

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: Messages.INTERNAL_SERVER_ERROR,
    });
  }
};


// get upcoming schedule API 
export const getUpcomingSchedule = async (req, res) => {
  try {
    const learnerId = req.user?.userId;

    if (!learnerId || !mongoose.Types.ObjectId.isValid(learnerId)) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "Invalid learner authentication",
      });
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    if (
      !Number.isInteger(page) ||
      !Number.isInteger(limit) ||
      page < 1 ||
      limit < 1 ||
      limit > 50
    ) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Invalid pagination parameters",
      });
    }

    const skip = (page - 1) * limit;
    const currentDate = new Date();

    const sessions = await LearnerSchedule.find({
      learner: learnerId,
      sessionDateTime: {
        $gte: currentDate,
      },
    })
      .populate({
        path: "instructor",
        select: "fullName",
      })
      .sort({ sessionDateTime: 1 })
      .skip(skip)
      .limit(limit);

    const totalSessions = await LearnerSchedule.countDocuments({
      learner: learnerId,
      sessionDateTime: {
        $gte: currentDate,
      },
    });

    const upcomingSessions = sessions.map((session) => {
      const sessionDateTime = new Date(session.sessionDateTime);
      const isoDateTime = sessionDateTime.toISOString();

      return {
        sessionId: session._id,
        sessionTitle: session.title,
        sessionDate: isoDateTime.slice(0, 10),
        sessionTime: isoDateTime.slice(11, 16),
        instructorName: session.instructor?.fullName || "Unknown Instructor",
        sessionType: session.sessionType,
      };
    });

    return res.status(HttpStatusCode.SUCCESS).json({
      success: true,
      message: "Upcoming schedule fetched successfully",
      data: upcomingSessions,
      pagination: {
        totalRecords: totalSessions,
        currentPage: page,
        totalPages: Math.ceil(totalSessions / limit),
        limit,
      },
    });
  } catch (error) {
    console.error("Upcoming Schedule Error:", error);

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: Messages.INTERNAL_SERVER_ERROR,
    });
  }
};



export const getRecommendedCourses = async (req, res) => {
  try {
    const learnerId = req.user?.userId;

    if (!learnerId || !mongoose.Types.ObjectId.isValid(learnerId)) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "Invalid learner authentication",
      });
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;

    if (
      !Number.isInteger(page) ||
      !Number.isInteger(limit) ||
      page < 1 ||
      limit < 1 ||
      limit > 50
    ) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Invalid pagination parameters",
      });
    }

    const skip = (page - 1) * limit;

    
    const enrolledCourseIds = await Enrollment.distinct("course", {
      learner: learnerId,
    });

    const courses = await Course.find({
      status: "Published",
      _id: {
        $nin: enrolledCourseIds,
      },
    })
      .select("title category rating thumbnail instructor")
      .populate({
        path: "instructor",
        model: userModel,
        select: "fullName",
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalCourses = await Course.countDocuments({
      status: "Published",
      _id: {
        $nin: enrolledCourseIds,
      },
    });

    const recommendedCourses = await Promise.all(
      courses.map(async (course) => {
        const learnerCount = await Enrollment.countDocuments({
          course: course._id,
        });

        return {
          courseId: course._id,
          courseTitle: course.title,
          courseCategory: course.category,
          courseRating: course.rating ?? null,
          instructorName: course.instructor?.fullName || "Unknown Instructor",
          learnerCount,
          courseThumbnail: course.thumbnail,
        };
      })
    );

    return res.status(HttpStatusCode.SUCCESS).json({
      success: true,
      message: "Recommended courses fetched successfully",
      data: recommendedCourses,
      pagination: {
        totalRecords: totalCourses,
        currentPage: page,
        totalPages: Math.ceil(totalCourses / limit),
        limit,
      },
    });
  } catch (error) {
    console.error("Recommended Courses Error:", error);

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: Messages.INTERNAL_SERVER_ERROR,
    });
  }
};
