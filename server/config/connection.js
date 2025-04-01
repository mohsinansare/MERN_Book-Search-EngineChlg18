import mongoose from 'mongoose';

// Use environment variable or fallback to local MongoDB
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bookSearchEngine';

// Connect to MongoDB
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Export the connection
export default mongoose.connection;