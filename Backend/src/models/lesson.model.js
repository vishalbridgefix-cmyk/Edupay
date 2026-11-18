
import mongoose from "mongoose";

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
            trim: true,
        },

        videoUrl: {
            type: String,
            default: "",
        },

        duration: {
            type: Number,
            default: 0,
            min: 0,
        },

        order: {
            type: Number,
            default: 1,
            min: 1,
        },
    },
    { timestamps: true }
);

const Lesson = mongoose.model("Lesson", lessonSchema);

export default Lesson;
