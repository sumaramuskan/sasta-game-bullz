// controllers/venueController.js
const Venue = require('../model/Venue');
const mongoose = require('mongoose');
const axios = require('axios')


// Controller to book a venue
exports.bookVenue = async (req, res) => {
  const { venueId , date , startTime, endTime } = req.body;
  const userId = req.user.id; // User from the token (middleware)

  try {
    const venue = await Venue.findById(venueId);
    if (!venue) return res.status(404).json({ message: 'Venue not found' });

    // Check if the venue is active
    if (!venue.isActive) {
      return res.status(400).json({ message: 'Venue is not active for booking' });
    }

    // Check if the slot is already booked
    const isSlotBooked = venue.bookings.some((booking) =>
      booking.date.toISOString().split('T')[0] === date && 
      ((booking.startTime <= startTime && booking.endTime > startTime) || 
      (booking.startTime < endTime && booking.endTime >= endTime))
    );

    if (isSlotBooked) {
      return res.status(400).json({ message: 'This slot is already booked' });
    }

    // Create booking
    venue.bookings.push({
      date,
      startTime,
      endTime,
      user:new mongoose.Types.ObjectId(userId)
    });

    await venue.save();
    res.status(201).json({ message: 'Booking successful', venue });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error booking venue', error });
  }
};

// Controller to get bookings for a specific venue
exports.getVenueBookings = async (req, res) => {
  const { venueId } = req.params;

  try {
    const venue = await Venue.findById(venueId);
    if (!venue) return res.status(404).json({ message: 'Venue not found' });

    res.status(200).json({ bookings: venue.bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
};

// Controller to check if a specific time slot is available
exports.checkAvailability = async (req, res) => {
  const { venueId, date, startTime, endTime } = req.body;

  try {
    const venue = await Venue.findById(venueId);
    if (!venue) return res.status(404).json({ message: 'Venue not found' });

    // Check if the slot is already booked
    const isSlotBooked = venue.bookings.some((booking) =>
      booking.date.toISOString().split('T')[0] === date &&
      ((booking.startTime <= startTime && booking.endTime > startTime) ||
      (booking.startTime < endTime && booking.endTime >= endTime))
    );

    if (isSlotBooked) {
      return res.status(400).json({ message: 'This slot is already booked' });
    }

    res.status(200).json({ message: 'Slot is available' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error checking availability', error });
  }
};
