import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoUrl: string = process.env.MONGODB_URL!;

const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoUrl);
    console.log(`MongoDB connected`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectToDatabase;
