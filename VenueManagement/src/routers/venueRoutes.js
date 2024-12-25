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
router.get('/fetch', authenticate, getAllVenues);

// Route to get a specific venue by ID
router.get('/:id', authenticate, getVenueById);

// Route to update a venue
router.put('/:id', authenticate, updateVenue);

// Route to deactivate a venue
router.patch('/:id/deactivate', authenticate, deactivateVenue);

module.exports = router;
