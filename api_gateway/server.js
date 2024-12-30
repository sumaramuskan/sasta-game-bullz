
// server.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();
// const helmet = require('helmet');


const app = express();
const PORT = process.env.PORT || 3000;

// app.use(helmet());
// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Proxy configurations for different services
const authServiceProxy = createProxyMiddleware({
  target: process.env.AUTH_SERVICE_URL, // URL of the authentication service
  changeOrigin: true,
  pathRewrite: {
    '^/auth': '', // Remove '/auth' prefix before forwarding
  },
});

const venueServiceProxy = createProxyMiddleware({
  target: process.env.VENUE_SERVICE_URL, 
  changeOrigin: true,
  pathRewrite: {
    '^/venue': '', 
  },
});

// Proxy routes
app.use('/venue', venueServiceProxy);
app.use('/auth',  authServiceProxy);

// Fallback route for unmatched endpoints
app.use('*', (req, res) => {
  res.status(404).json({ message: 'API Gateway: Endpoint not found' });
});

// Start the API Gateway server
app.listen(PORT, () => {
  console.log(`API Gateway running at http://localhost:${PORT}`);
});
