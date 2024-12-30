
const Venue = require('../model/Venue');
// const User = require('../models/User');

// Create a new venue
exports.createVenue = async (req, res) => {
  const { name, location, capacity, sportsAvailable, contactNumber , owner , isActive,pricePerHour } = req.body;
  
  try {
    const venue = new Venue({
      name,
      location,
      capacity,
      sportsAvailable,
      contactNumber,
      owner,
      isActive,
      pricePerHour,

    });
    await venue.save();
    res.status(201).json({ message: 'Venue created successfully', venue });
  } catch (error) {
    res.status(400).json({ message: 'Error creating venue', error });
  }
};

// Get all venues
exports.getAllVenues = async (req, res) => {
  try {
    const venues = await Venue.find({isActive : true});
    res.status(200).json({ venues });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching venues', error });
  }
};

// Get a single venue by ID
exports.getVenueById = async (req, res) => {
  const { id } = req.params;
  try {
    const venue = await Venue.findById(id);
    if (!venue) return res.status(404).json({ message: 'Venue not found' });

    res.status(200).json({ venue });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching venue', error });
  }
};

// Update venue details
//http://localhost:8000/venue/api/update/676cfb392e1666986b47d8ce 
exports.updateVenue = async (req, res) => {

  const { id } = req.params;
  const { name, location, capacity, sportsAvailable, contactNumber, isActive , pricePerHour } = req.body;

  try {
    const venue = await Venue.findById(id);
    if (!venue) return res.status(404).json({ message: 'Venue not found' });

    // if (venue.owner.toString() !== req.user._id.toString()) {
    //   return res.status(403).json({ message: 'You are not authorized to update this venue' });
    // }

    venue.name = name || venue.name;
    venue.location = location || venue.location;
    venue.capacity = capacity || venue.capacity;
    venue.sportsAvailable = sportsAvailable || venue.sportsAvailable;
    venue.contactNumber = contactNumber || venue.contactNumber;
    venue.isActive = isActive !== undefined ? isActive : venue.isActive;
    venue.pricePerHour = pricePerHour || venue.pricePerHour;



    await venue.save();
    res.status(200).json({ message: 'Venue updated successfully', venue });
  } catch (error) {
    res.status(400).json({ message: 'Error updating venue', error },{"error":error});
  }
};

// Deactivate venue
//http://localhost:8000/venue/api/deactivate/676cfb392e1666986b47d8ce
exports.deactivateVenue = async (req, res) => {
  const { id } = req.params;

  try {
    const venue = await Venue.findById(id);
    if (!venue) return res.status(404).json({ message: 'Venue not found' });

    // if (venue.owner.toString() !== req.user._id.toString()) {
    //   return res.status(403).json({ message: 'You are not authorized to deactivate this venue' });
    // }

    venue.isActive = false;
    await venue.save();
    res.status(200).json({ message: 'Venue deactivated successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deactivating venue', error });
  }
};

