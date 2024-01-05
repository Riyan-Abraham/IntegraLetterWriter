document.getElementById("send-btn").addEventListener("click", function() {
    var inputBox = document.getElementById("input-box");
    var message = inputBox.value.trim();

    if (message !== "") {
        // Append user message to chat
        appendMessage("User", message);

        // Call your GPT assistant API here
        callGPTAssistantAPI(message, function(response) {
            appendMessage("GPT Assistant", response);
        });
    }

    inputBox.value = "";
});

function appendMessage(sender, message) {
    var chatBox = document.getElementById("chat-box");
    var messageDiv = document.createElement("div");
    messageDiv.textContent = sender + ": " + message;

    // Add copy button
    var copyBtn = document.createElement("button");
    copyBtn.textContent = "Copy";
    copyBtn.onclick = function() {
        navigator.clipboard.writeText(message);
    };

    messageDiv.appendChild(copyBtn);
    chatBox.appendChild(messageDiv);
}

function callGPTAssistantAPI(message, callback) {
    // Implement the API call to your GPT assistant here
    // Use XMLHttpRequest or fetch API
    // On successful response, call the callback function with the response text

    // Example:
    /*
    fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: message })
    })
    .then(response => response.json())
    .then(data => callback(data.reply))
    .catch(error => console.error('Error:', error));
    */
}

