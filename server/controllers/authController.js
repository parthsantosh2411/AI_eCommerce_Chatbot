const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.signup = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ error: "User already exists" });

        // Let User.js hash the password automatically
        user = new User({ name, email, password, phone });
        await user.save();

        // Create JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        // Return token and user info (excluding password)
        res.status(201).json({
            message: "User registered successfully",
            token,
            user: { id: user._id, name: user.name, email: user.email, phone: user.phone }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        // Create JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        // Return token and user info (excluding password)
        res.json({
            message: "Login successful",
            token,
            user: { id: user._id, name: user.name, email: user.email, phone: user.phone }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
