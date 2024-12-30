// controllers/venueController.js
const Venue = require('../model/Venue');
const mongoose = require('mongoose');
const axios = require('axios')
const {broadcastMessage}=require('../utils/websocket')



const calculateCost = (startTime, endTime, perHourCost) => {
  const start = parseFloat(startTime.replace(':', '.'));
  const end = parseFloat(endTime.replace(':', '.'));
  const duration = end - start;
  return duration * perHourCost;
};



exports.bookVenue = async (req, res) => {
  const { venueId, date, startTime, endTime, sport } = req.body;
  const userId = req.user.id; // User from the token (middleware)

  try {
    const venue = await Venue.findById(venueId);
    if (!venue) return res.status(404).json({ message: 'Venue not found' });

    // Check if the venue is active
    if (!venue.isActive) {
      return res.status(400).json({ message: 'Venue is not active for booking' });
    }

    // Check if the sport is available at the venue
    if (!venue.sportsAvailable || !venue.sportsAvailable.includes(sport)) {
      return res.status(400).json({ message: 'Selected sport is not available at this venue' });
    }

    // Convert times to 24-hour format for comparison
    const convertTo24Hour = (time) => {
      const [hour, minute] = time.split(':');
      const isPM = time.toLowerCase().includes('pm');
      let hour24 = parseInt(hour, 10);
      if (isPM && hour24 !== 12) hour24 += 12;
      if (!isPM && hour24 === 12) hour24 = 0;
      return `${hour24.toString().padStart(2, '0')}:${minute.replace(/(am|pm)/i, '').trim()}`;
    };

    const startTime24 = convertTo24Hour(startTime);
    const endTime24 = convertTo24Hour(endTime);
//    console.log(typeof(startTime24))
//    console.log(endTime24)

    if(startTime24<"09:00" || endTime24>"21:00"){
    return res.json({message:"Venue is Closed"})
    }

    // Calculate duration in hours
    const [startHour, startMinute] = startTime24.split(':').map(Number);
    const [endHour, endMinute] = endTime24.split(':').map(Number);
    const duration = (endHour + endMinute / 60) - (startHour + startMinute / 60);

    if (duration <= 0) {
      return res.status(400).json({ message: 'End time must be after start time' });
    }

    // Check if the slot is already booked
    const isSlotBooked = venue.bookings.some((booking) =>
      booking.date.toISOString().split('T')[0] === date &&
      booking.sport === sport &&
      ((booking.startTime <= startTime24 && booking.endTime > startTime24) ||
        (booking.startTime < endTime24 && booking.endTime >= endTime24))
    );

    if (isSlotBooked) {
      return res.status(400).json({ message: 'This slot is already booked for the selected sport' });
    }

    const cost = parseInt(duration * venue.pricePerHour);
    booking=[date,
                   startTime24,
                   endTime24,
                   new mongoose.Types.ObjectId(userId),
                   sport,
                   cost,
                   sport]

    // Create booking
    venue.bookings.push({date,
                                            startTime: startTime24,
                                            endTime: endTime24,
                                            user: new mongoose.Types.ObjectId(userId),
                                            sport,
                                            cost,
                                            sport});
    broadcastMessage( booking )
    await venue.save();
    res.status(201).json({ message: 'Booking successful', venue, cost });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error booking venue', "error":error });
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
exports.checkAvailability = async (venueId, date, startTime, endTime) => {
//  const { venueId, date, startTime, endTime } = req.body;

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

