// script.js

const chatOutput = document.getElementById('chatOutput');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

const ws = new WebSocket('ws://localhost:8080');

ws.onopen = function () {
    console.log('Connected to the server');
};

ws.onmessage = function (event) {
    displayMessage(event.data);
};

sendButton.addEventListener('click', sendMessage);

function sendMessage() {
    const message = userInput.value;
    displayMessage('You: ' + message);
    userInput.value = '';
    ws.send(message);
}

function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    chatOutput.appendChild(messageElement);
}
