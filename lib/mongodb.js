import mongoose from "mongoose";
const { MONGODB_URI } = process.env;

export const connectDB = async () => {
  try {
    
    await mongoose.connect(MONGODB_URI);
    console.log("connected to mongoDB");

  } catch (error) {
    console.error(error);
  }
};