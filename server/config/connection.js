import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config(); // Adjust the path to your .env file

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI); // Simplified connection
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

mongoose.set('debug', true);
// Call connectDB to establish the connection
connectDB();

// Export the Mongoose connection object
export default mongoose.connection;