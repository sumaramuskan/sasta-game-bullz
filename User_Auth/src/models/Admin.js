const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Full name of the admin/owner
  email: { type: String, required: true, unique: true }, // Unique email address
  contactNumber: { type: String }, // Contact number for communication
  password: { type: String, required: true }, // Hashed password for security
  role: { 
    type: String, 
    enum: ['admin', 'owner'], 
    default: 'admin' 
  }, // Role can be 'admin' or 'owner'
  assignedVenues: { 
    type: [String], 
    default: [] 
  }, // List of venue IDs managed by the admin or owner
  commissionRate: { 
    type: Number, 
  
  }, // Commission rate percentage
  totalEarnings: { 
    type: Number, 
    default: 0 
  }, 
  lastLogin: { type: Date, default: null }, // Tracks the last login time
  isActive: { type: Boolean, default: true }, // Indicates if the admin/owner account is active
}, { timestamps: true });

module.exports = mongoose.model('Admin', AdminSchema);

