import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    order: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: true },
);

moduleSchema.index({ courseId: 1, order: 1 });

const moduleModel = mongoose.model("modules", moduleSchema);

export default moduleModel;
