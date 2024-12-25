const express = require('express');
const router = express.Router();
const { adminSignup, adminLogin } = require('../controllers/adminController');
const { userSignup, userLogin } = require('../controllers/userController');

// Admin routes
router.post('/admin/signup', adminSignup);
router.post('/admin/login', adminLogin);

// User routes
router.post('/user/signup', userSignup);
router.post('/user/login', userLogin);

module.exports = router;
