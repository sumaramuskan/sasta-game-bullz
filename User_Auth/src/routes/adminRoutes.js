
const express = require('express');
const {
  getAllUsers,
  getUserById,
  updateUser,
  deactivateUser,
  getBookingStatistics,
} = require('../controllers/adminController');
const authMiddleware = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();

// Admin routes
router.get('/users', authMiddleware, isAdmin, getAllUsers); // Fetch all users
router.get('/users/:id', authMiddleware, isAdmin, getUserById); // Fetch a user by ID
router.put('/users/:id', authMiddleware, isAdmin, updateUser); // Update user details
router.patch('/users/:id/deactivate', authMiddleware, isAdmin, deactivateUser); // Deactivate user account
router.get('/stats/bookings', authMiddleware, isAdmin, getBookingStatistics); // Booking statistics

module.exports = router;
