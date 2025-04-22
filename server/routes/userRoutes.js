const express = require("express");
const { getUserProfile } = require("../controllers/userController"); // ✅ Correct import
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// User profile route (Protected)
router.get("/profile", authMiddleware, getUserProfile);

module.exports = router;
