const { Server } = require("socket.io");

let io;

const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*", // Change this to match your frontend URL
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on("sendMessage", (data) => {
            console.log("Message received:", data);
            io.emit("receiveMessage", data); // Broadcast to all users
        });

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
};

module.exports = { initializeSocket, io };
