require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors=require("cors")
const path=require("path")
const venueRoutes = require('./src/routers/venueRoutes');
const bookingRoutes = require('./src/routers/bookingRoutes');
const connectDB=require('./src/config/conn')
const http=require('http')
const app = express();
const {Server} = require('socket.io')
const { initializeSocketIO } = require('./src/utils/websocket')

app.use(express.json());
app.use(cors())
app.use(express.static(path.join(__dirname,'src/public')))

// Database connection
connectDB()
//let io;
const server=http.createServer(app)
const io=initializeSocketIO(server)
// Routes

app.use('/api', venueRoutes);
app.use('/api/book', bookingRoutes);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
module.exports = {app , io}

//require('dotenv').config();
//const express = require('express');
//const mongoose = require('mongoose');
//const path = require('path');
//const http = require('http'); // To use HTTP server with WebSocket
//const connectDB = require('./src/config/conn');
//const { Server } = require('socket.io');
//
//const app = express();
//app.use(express.json());
//
//cons
//
//// Set X-Content-Type-Options header
//app.use((req, res, next) => {
//    res.setHeader('X-Content-Type-Options', 'nosniff');
//    next();
//});
//
//// Serve static files from /src/public
//app.use(express.static(path.join(__dirname, 'src', 'public')));
//
//// Database connection
//connectDB();
//
//// Start HTTP server and WebSocket server
//const server = http.createServer(app);
//const io = new Server(server);
//
//io.on('connection', (socket) => {
//    console.log('New client connected:', socket.id);
//    // Handle disconnection
//       socket.on('message', (message) => {
//             console.log(`Received message: ${message} from ${socket.id}`);
//             // Send a response back to the client
//             socket.emit('response', `Server received: ${message} `);
//         });
//    socket.on('disconnect', () => {
//        console.log('Client disconnected:', socket.id);
//    });
//});
//
//// Serve index.html from /src/public
//app.get('/', (req, res) => {
//    res.sendFile(path.join(__dirname, 'src', 'public', 'index.html'));
//});
//
//const PORT = process.env.PORT || 3000;
//
//server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
