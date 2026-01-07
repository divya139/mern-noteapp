import mongoose from 'mongoose';

/**
 * Connect to MongoDB using Mongoose.
 * Reads connection string from process.env.MONGO_URI or falls back to localhost.
 * Exits the process on fatal connection error.
 */
const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI ;

  try {
    // Recommended mongoose option
    mongoose.set('strictQuery', false);

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Successfully connected to ${mongoURI}`);

    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message || err);
    // If the DB is required for the app to run, exit with failure so a process manager can restart
    process.exit(1);
  }
};

export default connectDB;
