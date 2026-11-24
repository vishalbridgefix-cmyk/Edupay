
import mongoose from "mongoose";

const learningActivitySchema = new mongoose.Schema(
  {
    learner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

   
    durationMinutes: {
      type: Number,
      required: true,
      min: 1,
    },

    
    activityDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);

learningActivitySchema.index({
  learner: 1,
  activityDate: -1,
});

const LearningActivity = mongoose.model(
  "LearningActivity",
  learningActivitySchema
);

export default LearningActivity;
