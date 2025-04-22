const express = require("express");
const { signup, login } = require("../controllers/authController");
const jwt = require("jsonwebtoken");  // Import jwt package
const bcrypt = require("bcryptjs");  // Import bcrypt for password hashing

const router = express.Router();

// Secret key for JWT signing (should be in .env file in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';  // Use a secure key in production

// Signup Route
router.post("/signup", signup);

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: '1h',  // Token expiry (1 hour in this case)
    });

    // Send the token back to the client
    res.json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
