const WebSocket = require('ws');

let wss;

const initializeWebSocket = (server) => {
    wss = new WebSocket.Server({ server });
    wss.on('connection', (ws) => {
        console.log('New WebSocket connection established.');

        ws.on('message', (message) => {
            console.log(`Received: ${message}`);
            // Handle incoming messages
            handleClientMessage(ws, message);
        });

        ws.on('close', () => {
            console.log('WebSocket connection closed.');
        });
    });

    return wss;
};

const broadcastMessage = (message) => {
console.log(message)
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
};

const handleClientMessage = (ws, message) => {
    try {
        const data = JSON.parse(message);
        // Handle different message types
        if (data.type === 'BOOKING_REQUEST') {
            processBooking(data);
        }
    } catch (error) {
        console.error('Invalid message format', error);
    }
};

const processBooking = (data) => {
    // Example booking logic
    broadcastMessage({
        type: 'BOOKING_CONFIRMATION',
        data: { venueId: data.venueId, userId: data.userId, status: 'confirmed' },
    });
};

module.exports = {initializeWebSocket, broadcastMessage };
