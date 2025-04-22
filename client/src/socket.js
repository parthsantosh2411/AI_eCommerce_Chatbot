import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket"], // Force WebSocket for better debugging
  withCredentials: true, // Ensures cross-origin requests work if needed
});

window.socket = socket; // ✅ Make 'socket' available globally

export default socket;
