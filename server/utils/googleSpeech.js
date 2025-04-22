const fs = require("fs");
const path = require("path");
const speech = require("@google-cloud/speech");

const client = new speech.SpeechClient({
  keyFilename: path.join(__dirname, "../google-speech-key.json"),
});

const transcribeAudio = async (audioPath) => {
  const file = fs.readFileSync(audioPath);
  const audioBytes = file.toString("base64");

  const audio = { content: audioBytes };
  const config = {
    encoding: "WEBM_OPUS",
    sampleRateHertz: 48000,
    languageCode: "en-US",
  };

  const request = { audio, config };
  const [response] = await client.recognize(request);

  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join("\n");

  return transcription;
};

module.exports = { transcribeAudio };
