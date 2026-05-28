



const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3001", // Matches your exact React port
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    let assignedRoom = null;

    socket.on('message', (data) => {
        // Handle explicit Room Corridor entry protocols
        if (data.type === 'join') {
            assignedRoom = data.room;
            socket.join(assignedRoom);
            console.log(`Socket [${socket.id}] verified inside Room Axis corridor [${assignedRoom}]`);
            return;
        }

        // Forward signaling objects exclusively to users sharing the same room key
        if (data.room) {
            socket.to(data.room).emit('message', data);
        } else {
            socket.broadcast.emit('message', data);
        }
    });

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Signaling cluster array listening on port ${PORT}`);
});