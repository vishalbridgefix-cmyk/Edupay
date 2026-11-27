import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: true,
    },

    // For lesson title
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Lesson title must be at least 3 characters"],
      maxlength: [120, "Lesson title cannot exceed 120 characters"],
    },

    // For lesson learning objective
    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },

    // Lesson Format
    format: {
      type: String,
      enum: ["video", "article", "slides", "resources"],
      default: "article",
    },

    // Video URL - Required only when format is video
    videoUrl: {
      type: String,
      trim: true,
      default: "",
      required: function () {
        return this.format === "video";
      },
    },

    // Lesson Notes - Available for all lesson formats
    notes: {
      type: String,
      default: "",
      trim: true,
    },

    // Duration in minutes
    duration: {
      type: Number,
      default: 0,
      min: [0, "Duration cannot be negative"],
    },

    // Difficulty Level
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },

    // Preview Access
    previewAccess: {
      type: String,
      enum: ["enrolled_learners", "everyone", "preview_only"],
      default: "enrolled_learners",
    },

    // Completion Rule
    completionRule: {
      type: String,
      enum: ["mark_as_complete", "watch_entire_video", "complete_assessment"],
      default: "mark_as_complete",
    },

    // Lesson Order
    order: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  { timestamps: true },
);

// Index for fetching lessons module-wise in order
lessonSchema.index({ moduleId: 1, order: 1 });

// Create Lesson Model
const Lesson = mongoose.model("Lesson", lessonSchema);

export default Lesson;
