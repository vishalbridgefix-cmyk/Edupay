import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
    {
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },

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

        order: {
            type: Number,
            default: 1,
            min: 1,
        },
    },
    { timestamps: true }
);

moduleSchema.index({ courseId: 1, order: 1 });
        
const Module = mongoose.model("Module", moduleSchema);

export default Module;
