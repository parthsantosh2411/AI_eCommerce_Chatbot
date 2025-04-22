import React, { useEffect, useState } from "react";
import socket from "../utils/socket"; // Make sure path is correct

const ChatComponent = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        console.log("🔍 Checking WebSocket connection...", socket);
        
        socket.on("connect", () => {
            console.log("✅ WebSocket Connected:", socket.id);
        });

        socket.on("receiveMessage", (data) => {
            console.log("📩 Message Received:", data);
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socket.off("connect");
            socket.off("receiveMessage");
        };
    }, []);

    const sendMessage = () => {
        console.log("📤 Sending Message:", message);
        if (socket && socket.connected) {
            socket.emit("sendMessage", message);
        } else {
            console.error("❌ WebSocket is not connected!");
        }
        setMessage("");
    };

    return (
        <div>
            <h2>WebSocket Chat</h2>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatComponent;
