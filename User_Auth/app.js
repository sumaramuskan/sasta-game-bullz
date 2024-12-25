
const express = require('express');
const connectDB = require('./src/config/conn');  // Import the MongoDB connection logic
const authRoutes = require('./src/routes/authRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const app = express();

// Connect to MongoDB
connectDB();

// Middleware for parsing JSON bodies
app.use(express.json());

// Define routes, controllers, etc.
app.use('/api/auth', authRoutes);
 app.use('/api/admin', adminRoutes);
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
