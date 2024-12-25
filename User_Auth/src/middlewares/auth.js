const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id) || await Admin.findById(decoded.id);
    if (!req.user) return res.status(404).json({ message: 'User not found' });
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// const authMiddleware = async (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header
//   if (!token) return res.status(401).json({ message: 'No token provided' });
//   try {
//     // Verify the token and extract the decoded payload
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
//     // Find the user in the User model based on the decoded ID
//     const user = await User.findById(decoded.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });
    
//     req.user = user; // Attach user to the request object

//     // Optionally, check the user's role here if you have specific role-based routes
//     // For example, if you want to restrict access for non-admin users:
//     if (req.originalUrl.includes('/admin') && user.role !== 'admin') {
//       return res.status(403).json({ message: 'Access denied. Admins only.' });
//     }

//     // Allow the request to continue to the next middleware or route handler
//     next();
//   } catch (error) {
//     // If there's an error with the token (expired, invalid, etc.), send an error response
//     res.status(401).json({ message: 'Invalid or expired token' });
//   }
// };

module.exports = authMiddleware;
