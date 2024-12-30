//require('dotenv').config();
//const express = require('express');
//const mongoose = require('mongoose');
//const venueRoutes = require('./src/routers/venueRoutes');
//const bookingRoutes = require('./src/routers/bookingRoutes');
//const connectDB=require('./src/config/conn')
//const WebSocket=require("ws")
//const http=require('http')
//
//
//const app = express();
//const server=http.createServer(app)
//const wss=new WebSocket.Server({ server })
//app.use(express.json());
//
//// Database connection
//connectDB()
//
//// Routes
//app.use('/api', venueRoutes);
//app.use('/api/book', bookingRoutes);
//wss.on("connection",(ws)=>{
//console.log("WebSocket Server is running")
//})
//
//wss.on("book",(ws)=>{
//})
//
//// Start server
//const PORT = process.env.PORT || 6000;
//app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http'); // To use HTTP server with WebSocket
const { initializeWebSocket } = require('./src/utils/websocket');
const venueRoutes = require('./src/routers/venueRoutes');
const bookingRoutes = require('./src/routers/bookingRoutes');
const connectDB = require('./src/config/conn');
const WebSocket=require("ws")

const app = express();
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use('/api', venueRoutes);
app.use('/api/book', bookingRoutes);

// Start HTTP server and WebSocket server
const server = http.createServer(app);
const wss = initializeWebSocket(server);

const PORT = process.env.PORT || 6000;

 server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
