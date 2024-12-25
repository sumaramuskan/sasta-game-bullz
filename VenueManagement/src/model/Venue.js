// models/Venue.js
const mongoose = require('mongoose');

const VenueSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the venue
  location: { type: String, required: true }, // Address of the venue
  capacity: { type: Number, required: true }, // Capacity of the venue
  sportsAvailable: { type: [String], required: true }, // List of sports available in the venue (e.g., ["Football", "Basketball"])
  contactNumber: { type: String, required: true }, // Contact number for the venue
  isActive: { type: Boolean, default: false }, // Is the venue currently active or closed
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user (owner) who added the venue
  openingHours: { // Operational hours
    type: Map,
    of: {
      open: { type: String, required: true }, // Opening time (e.g., "09:00 AM")
      close: { type: String, required: true }, // Closing time (e.g., "09:00 PM")
    },
    required: true,
    default: {
      Monday: { open: "09:00 AM", close: "09:00 PM" },
      Tuesday: { open: "09:00 AM", close: "09:00 PM" },
      Wednesday: { open: "09:00 AM", close: "09:00 PM" },
      Thursday: { open: "09:00 AM", close: "09:00 PM" },
      Friday: { open: "09:00 AM", close: "09:00 PM" },
      Saturday: { open: "10:00 AM", close: "10:00 PM" },
      Sunday: { open: "10:00 AM", close: "08:00 PM" },
    }
  },
  bookings: [ // Array to store bookings for specific dates
    {
      date: { type: Date, required: true }, // Date of booking
      startTime: { type: String, required: true }, // Start time of booking
      endTime: { type: String, required: true }, // End time of booking
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who booked the slot
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('Venue', VenueSchema);
