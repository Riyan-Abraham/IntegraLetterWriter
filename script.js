// script.js
document.getElementById("send-btn").addEventListener("click", async function() {
    var inputBox = document.getElementById("input-box");
    var userMessage = inputBox.value.trim();

    if (userMessage !== "") {
        // Append user message to chat
        appendMessage("User", userMessage);

        // Send the message to your server
        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessage })
        })
        .then(response => response.json())
        .then(data => {
            appendMessage("GPT Assistant", data.reply);
        })
        .catch(error => {
            console.error('Error:', error);
            appendMessage("GPT Assistant", "Sorry, there was an error processing your request.");
        });

        inputBox.value = "";
    }
});
