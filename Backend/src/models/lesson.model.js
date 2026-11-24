import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
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
            minlength: [3, "Lesson title must be at least 3 characters"],
            maxlength: [120, "Lesson title cannot exceed 120 characters"],
        },

        description: {
            type: String,
            default: "",
            trim: true,
            maxlength: [500, "Description cannot exceed 500 characters"],
        },

        content: {
            type: String,
            default: "",
            trim: true,
        },

        order: {
            type: Number,
            default: 1,
            min: 1,
        },
    },
    { timestamps: true }
);

// Index for fetching lessons module-wise in order
lessonSchema.index({ moduleId: 1, order: 1 });

// Create Lesson Model
const Lesson = mongoose.model("Lesson", lessonSchema);

export default Lesson;
