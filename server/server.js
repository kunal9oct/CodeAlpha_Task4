const WebSocket = require('ws');
const axios = require('axios');
require('dotenv').config();

const wss = new WebSocket.Server({ port: 8080 });

wss.on('listening', function () {
    console.log('WebSocket server is running on port 8080');
});

wss.on('connection', function connection(ws) {
    console.log('A client connected');

    ws.on('message', async function incoming(message) {
        console.log('Received: %s', message);
        try {
            // Send message to ChatGPT API for processing
            const response = await axios.post('https://api.openai.com/v1/completions', {
                prompt: message,
                model: 'text-davinci-003', // Specify the ChatGPT model you want to use
                max_tokens: 150 // Adjust max tokens as needed
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.API_KEY}` // Replace YOUR_API_KEY with your actual API key
                }
            });
            const chatResponse = response.data.choices[0].text.trim();
            console.log('ChatGPT Response:', chatResponse);
            // Send ChatGPT response back to the client
            ws.send(chatResponse);
        } catch (error) {
            console.error('Error:', error.response.data);
            // Send error message back to the client
            ws.send('Error: Internal Server Error');
        }
    });
});
