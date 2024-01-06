// server.js
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); // Serve your static files

// Endpoint to handle the chat requests
app.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        const response = await callGPTAssistantAPI(userMessage);
        res.json({ reply: response });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error processing your request');
    }
});

async function callGPTAssistantAPI(message) {
    const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPEN_AI_TOKEN}`
        },
        body: JSON.stringify({
            prompt: message,
            max_tokens: 150
        })
    });

    const data = await response.json();
    return data.choices[0].text.trim();
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

