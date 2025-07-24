import app from "./app";
import dotenv from "dotenv";
import { connectDB } from "./config";
// Load environment variables from .env file
dotenv.config();

// Define the port to run the server on
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
