const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  venue: { type: String, required: true }, // Venue name or ID
  sport: { type: String, required: true }, // Sport type (e.g., "Cricket", "Football")
  date: { type: Date, required: true }, // Booking date
  startTime: { type: String, required: true }, // Start time (e.g., "10:00 AM")
  endTime: { type: String, required: true }, // End time (e.g., "12:00 PM")
  amount: { type: Number, required: true }, // Amount paid
  status: { 
    type: String, 
    enum: ['Confirmed', 'Pending', 'Cancelled'], 
    default: 'Pending' 
  }, // Booking status
  attendees: { type: Number, default: 1 }, // Number of attendees
  specialRequests: { type: String, default: '' }, // Special requests or notes from the user
}, { timestamps: true });
