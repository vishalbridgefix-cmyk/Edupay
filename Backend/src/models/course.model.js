
import mongoose from "mongoose";

// Schema for one lesson
const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    videoUrl: {
      type: String,
      default: "",
    },

    duration: {
      type: Number,
      default: 0,
    },

    order: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

// Main Course schema
const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    thumbnail: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    difficultyLevel: {
      type: String,
      required: true,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },

    duration: {
      type: Number,
      required: true,
      min: 1,
    },

    price: {
      type: Number,
      default: 0,
      min: 0,
    },

    requirements: {
      type: [String],
      default: [],
    },

    learningOutcomes: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    lessons: {
      type: [lessonSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
