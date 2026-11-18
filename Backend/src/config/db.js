import mongoose from "mongoose";

const connectTODb = async () => {
  try {
   await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log("DB Error: ", error);
    process.exit(1);
  }
};
export default connectTODb;
