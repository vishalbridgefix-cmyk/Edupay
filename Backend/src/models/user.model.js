import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      minLength: [2, "FullName must be two characters long."],
      required: true,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      min: [13, "Age must be at least 13."],
      max: [100, "Age cannot exceed 100."],
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },

    password: {
      type: String,
      minLength: [6, "Password must be six characters long."],
      required: true,
      select: false,
    },

    address: {
      type: String,
      default: "",
    },

    ProfileImage: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["learner", "instructor", "admin"],
      default: "learner",
    },
  },
  { timestamps: true },
);

const userModel = mongoose.model("users", userSchema);

export default userModel;
