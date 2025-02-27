import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI;
  try {
    if (!uri) {
      console.log("uri is not provided");
      process.exit(1);
    } else {
      await mongoose.connect(uri);
    }
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
