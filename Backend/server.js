const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Google Generative AI setup (ensure your API key is correct)
const genAI = new GoogleGenerativeAI(AIzaSyDpL8hvC6Qi380Lj6S7Ma61hGuQIwKUQ7I); //"YOUR_API_KEY" // Replace with your Google API key
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post('/summarize', async (req, res) => {
  try {
    const { content } = req.body; // Extract content from the request

    const prompt = `Summarize the following content:\n\n${content}`;

    // Generate summary using Google's Generative AI model
    const result = await model.generateContent(prompt);
    const summary = result.response.text();

    // Return the summary as a JSON response
    res.json({ summary: summary });
  } catch (error) {
    console.error('Error generating summary:', error);
    res.status(500).send('Error processing the summary request.');
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
