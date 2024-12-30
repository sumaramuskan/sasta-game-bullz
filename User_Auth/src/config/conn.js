const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      console.error('MongoDB URI is not defined in the .env file!');
      process.exit(1);  // Exit process if Mongo URI is missing
    }

    // Connect to MongoDB without the deprecated options
    await mongoose.connect(mongoURI, {
//      useNewUrlParser: true,
//      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully!');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
