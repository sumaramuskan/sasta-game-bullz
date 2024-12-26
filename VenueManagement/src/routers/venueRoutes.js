const express = require('express');
const { 
  createVenue, 
  getAllVenues, 
  getVenueById, 
  updateVenue, 
  deactivateVenue 
} = require('../controllers/venueController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to create a venue
router.post('/create', authenticate, createVenue);

// Route to get all venues
router.get('/fetch', getAllVenues);

// Route to get a specific venue by ID
router.get('/fetch/:id',  getVenueById);

// Route to update a venue
router.patch('/update/:id', authenticate, updateVenue);

// Route to deactivate a venue
router.patch('/deactivate/:id',authenticate, deactivateVenue);

module.exports = router;
