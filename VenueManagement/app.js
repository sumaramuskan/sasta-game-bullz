require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const venueRoutes = require('./src/routers/venueRoutes');
const connectDB=require('./src/config/conn')

const app = express();
app.use(express.json());

// Database connection
connectDB()

// Routes
app.use('/api', venueRoutes);

// Start server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
