
import mongoose from "mongoose";

const connectTODb = async () => {
  try {
   await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("DB Error:", error.message);
    process.exit(1);
  }
};
export default connectTODb;
