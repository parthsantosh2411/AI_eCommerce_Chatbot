import sys
import torch
from transformers import BartTokenizer, BartForConditionalGeneration

# Load model
model_dir = r"C:\Users\Parth Tripathi\Downloads\FSPROJECT (1)\FSPROJECT\ai-ecommerce-chatbot\server\ai-model\customer_chatbot_model"  # Update model directory for BART
print("📦 Loading model from:", model_dir, file=sys.stderr)

# Load tokenizer and model from the local directory
tokenizer = BartTokenizer.from_pretrained(model_dir, local_files_only=True)
model = BartForConditionalGeneration.from_pretrained(model_dir, local_files_only=True)
model.eval()

# Read input text (from command line argument)
input_text = sys.argv[1]  # This will accept the input from the command line argument
print("📝 Input received:", input_text, file=sys.stderr)

# Tokenize the input text with a specified max_length
inputs = tokenizer(input_text, return_tensors="pt", padding=True, truncation=True, max_length=256)

# Generate response with fine-tuned parameters
with torch.no_grad():
    output = model.generate(
        inputs["input_ids"],
        max_length=256,  # Set max length of generated response
        temperature=0.7,  # Control randomness in the generation (lower is more deterministic)
        top_k=50,  # Top-K sampling for randomness
        top_p=0.95,  # Top-P (nucleus) sampling for randomness
        num_return_sequences=1,  # Number of sequences to generate
        no_repeat_ngram_size=2,  # Avoid repeating n-grams in the generated text
        early_stopping=True,  # Stop early if the model is done generating
        do_sample=True  # Enable sampling to make temperature and top_p effective
    )
    response = tokenizer.decode(output[0], skip_special_tokens=True)

# Print the generated response
print("🧠 Generated Response:", response, file=sys.stderr)

# Output result (to be picked up by the calling process, e.g., Node.js)
print(response)
