import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SendHorizontal } from "lucide-react";
import socket from "../utils/socket";
import SignupModal from "../components/SignupModal"; // Relative path from Chatbot.jsx
import "./Chatbot.css";

// Web Speech API integration for voice input
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false); // State to control the modal visibility
  const chatEndRef = useRef(null);

  const isLoggedIn = localStorage.getItem("authToken"); // Check if the user is logged in

  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ WebSocket Connected:", socket.id);
    });

    socket.on("receiveMessage", (botReply) => {
      console.log("🤖 Bot replied:", botReply);
      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
      setIsTyping(false);
    });

    return () => {
      socket.off("connect");
      socket.off("receiveMessage");
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    setIsTyping(true);
    socket.emit("sendMessage", input);
    setInput("");
  };

  const handleChatClick = () => {
    if (!isLoggedIn) {
      setShowSignupModal(true); // Show the modal if the user is not logged in
    } else {
      sendMessage(); // Proceed with sending the message if logged in
    }
  };

  const closeModal = () => {
    setShowSignupModal(false);
  };

  // Voice Input Handling
  const startVoiceInput = () => {
    if (SpeechRecognition) {
      recognition.start(); // Start the speech recognition
    } else {
      alert("Your browser does not support speech recognition.");
    }
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log("🎤 Speech recognized:", transcript);
    setInput(transcript); // Set the recognized speech into the input field
  };

  recognition.onerror = (event) => {
    console.error("Error occurred during speech recognition:", event.error);
  };

  return (
    <motion.div
      className="chatbot-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="chatbot-title">
        <i className="fas fa-robot"></i> Your E-Commerce Buddy
      </h1>

      <div className="chatbox">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            className={`message ${msg.sender}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            {msg.text}
          </motion.div>
        ))}
        {isTyping && (
          <motion.div
            className="message bot typing-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span></span>
            <span></span>
            <span></span>
          </motion.div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleChatClick()}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleChatClick} // Check login status on button click
        >
          <SendHorizontal size={22} />
        </motion.button>

        {/* Microphone Button for Voice Input */}
        <motion.button
          className="voice-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={startVoiceInput}
        >
          🎤
        </motion.button>
      </div>

      {showSignupModal && <SignupModal onClose={closeModal} />}
    </motion.div>
  );
};

export default Chatbot;
