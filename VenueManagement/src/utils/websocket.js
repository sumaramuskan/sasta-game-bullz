
const { Server } = require('socket.io');

let io;

const initializeSocketIO = (server) => {
    io = new Server(server);

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        // Handle incoming messages from clients
        socket.on('message', (message) => {
            console.log(`Received message: ${message} from ${socket.id}`);
            // Respond back to the client
            socket.emit('bookingUpdate', `Server received: ${message}`);
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });

    return io;
};
// Function to broadcast booking updates to all clients
const broadcastBookingUpdate = (update) => {
    console.log('booking update:', update);
    io.emit('bookingUpdate', update);
};

module.exports = { initializeSocketIO, broadcastBookingUpdate };
