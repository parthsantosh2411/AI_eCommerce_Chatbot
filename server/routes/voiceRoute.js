// routes/voiceRoute.js
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { transcribeAudio } = require("../utils/googleSpeech");

const router = express.Router();

// Store uploaded files temporarily in 'uploads/' directory
const upload = multer({ dest: "uploads/" });

router.post("/voice", upload.single("audio"), async (req, res) => {
  try {
    const audioPath = req.file.path;

    // Transcribe the uploaded audio
    const transcript = await transcribeAudio(audioPath);

    // Delete the temp audio file
    fs.unlinkSync(audioPath);

    res.json({ text: transcript });
  } catch (error) {
    console.error("❌ Transcription Error:", error.message);
    res.status(500).json({ error: "Transcription failed" });
  }
});

module.exports = router;
