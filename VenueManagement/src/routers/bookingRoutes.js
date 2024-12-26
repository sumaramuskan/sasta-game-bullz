// routes/venueRoutes.js
const express = require('express');
const router = express.Router();
const {bookVenue,getVenueById,checkAvailability,getVenueBookings} = require('../controllers/bookingController');
const {authenticate} = require('../middleware/authMiddleware');

// Route to book a venue
router.post('/get',authenticate, bookVenue);

// Route to get bookings for a venue
router.get('/:venueId/bookings',authenticate, getVenueBookings);

// Route to check availability of a venue
router.post('/checkAvailability', checkAvailability);

module.exports = router;

