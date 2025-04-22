const { Server } = require("socket.io");
const { generateAIResponse } = require("./controllers/aiController");

function initializeSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173", // or your frontend URL
            methods: ["GET", "POST"],
            credentials: true,
        }
    });

    io.on("connection", (socket) => {
        console.log("✅ New WebSocket Connection:", socket.id);

        // Handle incoming message
        socket.on("sendMessage", async (message) => {
            console.log("📩 Received message:", message);

            try {
                const aiResponse = await generateAIResponse(message);
                console.log("🤖 AI Response:", aiResponse);

                // Send response only to the sender
                socket.emit("receiveMessage", aiResponse);
            } catch (err) {
                console.error("❌ Error in T5 inference:", err);
                socket.emit("receiveMessage", "Sorry, I couldn't understand that.");
            }
        });

        // Handle disconnection
        socket.on("disconnect", () => {
            console.log("❌ User Disconnected:", socket.id);
        });
    });

    return io;
}

module.exports = { initializeSocket };
