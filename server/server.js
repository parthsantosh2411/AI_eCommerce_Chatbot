const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { initializeSocket } = require("./socket");
const connectDB = require("./config/db"); // ✅ Import DB connection
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const userRoutes = require("./routes/userRoutes");
const voiceRoute = require("./routes/voiceRoute");

dotenv.config();

// ✅ Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/user", userRoutes);
app.use("/api/voice", voiceRoute);

// ✅ Create HTTP Server Before WebSocket
const server = require("http").createServer(app);

// ✅ Initialize WebSocket After HTTP Server
initializeSocket(server);

app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
