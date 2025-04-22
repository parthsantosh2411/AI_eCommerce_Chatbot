const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Ensure this exists
const dotenv = require("dotenv");

dotenv.config();

exports.authMiddleware = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const token = req.header("Authorization")?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Access denied. No token provided." });
        }

        // Verify the token using the JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach the user object to the request after finding it in the database
        req.user = await User.findById(decoded.id).select("-password");  // Exclude password
        
        if (!req.user) {
            return res.status(401).json({ error: "User not found." });
        }

        // Pass control to the next middleware or route handler
        next();
    } catch (error) {
        // Catch any errors in the JWT verification or user fetching process
        res.status(401).json({ error: "Invalid or expired token." });
    }
};
