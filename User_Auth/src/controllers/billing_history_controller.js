  // Get Booking History
const User=require('../models/User')

  exports.getBookingHistory = async (req, res) => {
    try {
      if (req.user.role === 'user') {
        // For users, fetch their own booking history
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json({ bookings: user.bookingHistory });
      } 
      
      if (req.user.role === 'admin' || req.user.role === 'owner') {
        // For admins, fetch all users' booking history
        const users = await User.find().populate('bookingHistory'); // Populate booking history for each user
        const allBookings = users.map(user => user.bookingHistory).flat(); // Flatten the array of bookings from all users
        return res.status(200).json({ bookings: allBookings });
      }
      return res.status(403).json({ message: 'Access denied' });
  
    } catch (error) {
      res.status(400).json({ message: 'Error fetching booking history', error });
    }
  };
  