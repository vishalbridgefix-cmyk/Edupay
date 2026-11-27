const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
  {
    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },

    instruction: {
      type: String,
      required: true,
      trim: true,
    },

    url: {
      type: String,
      default: null,
    },

    format: {
      type: String,
      enum: ["video", "github", "pdf", "ppt"],
      required: true,
    },

    duration: {
      type: Number,
      required: true,
      min: 1,
    },

    level: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },

    totalMarks: {
      type: Number,
      required: true,
      min: 1,
    },

    passingMarks: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["publish", "draft"],
      default: "draft",
    },

    deadline: {
      type: Date,
      required: true,
    },

    order: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Assignment", assignmentSchema);
