const express = require("express");
const { processChatMessage } = require("../controllers/chatController"); // ✅ Correct import
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Chatbot interaction (Protected Route)
router.post("/", authMiddleware, processChatMessage);

module.exports = router;
