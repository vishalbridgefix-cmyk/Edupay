import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      minLength: [2, "FullName must be two characters long."],
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: Number,
      min: [10, "Phone Number must be ten characters long."],
      required: true,
    },
    password: {
      type: String,
      minLength: [6, "Password must be six characters long."],
      required: true,
      select:false
    },
    role: {
      type: String,
      enum: ["learner", "instructor", "admin"],
      default: "learner",
    },
    ProfileImage: {
      type: String,
    },
  },
  { timestamps: true },
);

const  userModel = mongoose.model("users", userSchema);
export default userModel
