import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
/**
 * Connect to MongoDB database
 * @returns {Promise<void>}
 */
export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://");
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error while connnecting to database", error);
    process.exit(1);
  }
};
