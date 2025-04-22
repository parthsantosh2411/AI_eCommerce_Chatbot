const { spawn } = require("child_process");
const path = require("path");

async function generateAIResponse(prompt) {
    return new Promise((resolve, reject) => {
        const scriptPath = path.join(__dirname, "../ai-model/bart_infer.py");


        console.log("🚀 Running inference for prompt:", prompt);

        const python = spawn("python", [scriptPath, prompt]);

        let output = "";
        let errorOutput = "";

        python.stdout.on("data", (data) => {
            output += data.toString();
        });

        python.stderr.on("data", (data) => {
            errorOutput += data.toString();
        });

        python.on("close", (code) => {
            if (code === 0) {
                const cleaned = output.trim().split("\n").at(-1); // get last line
                resolve(cleaned);
            } else {
                console.error("❌ Python process exited with error:", errorOutput);
                reject(new Error("Bart model inference failed"));
            }
        });
    });
}

module.exports = { generateAIResponse };
