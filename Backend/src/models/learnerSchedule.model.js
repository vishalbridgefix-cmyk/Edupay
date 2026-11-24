
import mongoose from "mongoose";

const learnerScheduleSchema = new mongoose.Schema(
  {
    learner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    sessionDateTime: {
      type: Date,
      required: true,
    },

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    sessionType: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);


learnerScheduleSchema.index({
  learner: 1,
  sessionDateTime: 1,
});

const LearnerSchedule = mongoose.model(
  "LearnerSchedule",
  learnerScheduleSchema
);

export default LearnerSchedule;
