import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb+srv://selvarannav6231_db_user:iAqhdfhtkGzAyJyq@cluster0.3e5wr9z.mongodb.net/?appName=Cluster0";
    const connection = await mongoose.connect(mongoUri);

    console.log(`MongoDB connected: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.error("Please ensure MongoDB service is running or check your MONGODB_URI in .env");
  }
};

export default connectDB;