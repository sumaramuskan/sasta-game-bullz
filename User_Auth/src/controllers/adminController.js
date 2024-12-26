// Admin Signup

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');
const Booking = require('../models/Booking');


exports.adminSignup = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Ensure that only super admins can create new admins
    // const adminUser = await Admin.findById(req.user._id); // req.user is set via authMiddleware
    // if (!adminUser || adminUser.role !== 'admin') {
    //   return res.status(403).json({ message: 'Only admins can create other admins.' });
    // }

    // Create a new Admin
    const admin = await Admin.create({ name, email, password: hashedPassword });
    return res.status(201).json({ message: 'Admin created successfully', admin });
  } catch (error) {
    res.status(400).json({ message: 'Error creating admin account', error });
  }
};
// Admin Login
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find admin user
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    // Check if password matches
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Generate JWT token
    admin.lastLogin = new Date()
    admin.save()

    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(400).json({ message: 'Error logging in', error });
  }
};
// Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Get a user by ID (Admin only)
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    var user = await User.findById(id);

    if (!user) {
      user = await Admin.findById(id);
    }
    else if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};


// Update user details (Admin only)
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, role },
      { new: true } // Return the updated user
    );
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// Deactivate (soft delete) a user (Admin only)
exports.deactivateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { active: false }, // Assuming there is an 'active' field to mark if a user is deactivated
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User account deactivated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error deactivating user', error });
  }
};

// Get booking statistics (Admin only)
exports.getBookingStatistics = async (req, res) => {
  try {
    // Get total bookings
    const totalBookings = await Booking.countDocuments();

    // Get total confirmed bookings
    const confirmedBookings = await Booking.countDocuments({ status: 'Confirmed' });

    // Get total cancelled bookings
    const cancelledBookings = await Booking.countDocuments({ status: 'Cancelled' });

    res.status(200).json({
      totalBookings,
      confirmedBookings,
      cancelledBookings,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking statistics', error });
  }
};


exports.getAdminById = async (req, res) => {
  const { id } = req.params;

  try {
    var user = await Admin.findById(id);

    if (!user) return res.status(404).json({ message: 'Admin not found' });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};