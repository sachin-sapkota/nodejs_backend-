import mongoose from 'mongoose';
import { env } from "@/common/utils/envConfig";
const { MONGO_URI } = env

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
