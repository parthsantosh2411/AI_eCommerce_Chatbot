exports.processChatMessage = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        // Simulate AI response (Replace with actual AI model inference)
        const botReply = `You said: ${message}`;

        res.json({ message: botReply });
    } catch (error) {
        console.error("Chat processing error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
