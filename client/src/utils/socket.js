import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  withCredentials: true,
});

socket.on("connect", () => console.log("✅ WebSocket Connected:", socket.id));
socket.on("disconnect", () => console.log("❌ WebSocket Disconnected"));

export default socket;
