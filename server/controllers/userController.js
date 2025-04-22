// controllers/userController.js

exports.getUserProfile = async (req, res) => {
    try {
        // Assuming you have user data stored in `req.user` (set by authMiddleware)
        const user = req.user; 
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
