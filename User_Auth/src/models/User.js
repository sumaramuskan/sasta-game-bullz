const Booking = require("../models/Booking")
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Full name of the user
  email: { type: String, required: true, unique: true }, // Unique email address
  contactNumber: { type: String }, // Contact number for communication
  password: { type: String, required: true }, // Hashed password
  role: { type: String, default: 'user' }, // Role: 'user' or 'admin'
  isActive: { type: Boolean, default: true }, // Indicates if the user account is active
  preferredSports: { type: [String], default: [] }, // List of preferred sports (e.g., ["Cricket", "Football"])
  lastLogin: { type: Date, default: null }, // Last login timestamp,
  joined:{type:Date, default:new Date()},
  bookingHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }], // Array of past bookings
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
