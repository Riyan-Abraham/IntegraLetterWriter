document.getElementById("send-btn").addEventListener("click", async function() {
    var inputBox = document.getElementById("input-box");
    var userMessage = inputBox.value.trim();
    var spinner = document.getElementById("spinner");

    if (userMessage !== "") {
        console.log("Sending message:", userMessage); // Log message send
        appendMessage("User", userMessage);
        spinner.style.display = "block"; // Show the spinner

        fetch('https://script.google.com/macros/s/AKfycbxD9YW3N7grbVjVOdo8L7-sCECT4kQCgQcPUEVHVQRswvpaZo8y_WEmJV2Xb7IET-Yd/exec', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ message: userMessage })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Received response:", data); // Log response
            spinner.style.display = "none"; // Hide the spinner
            appendMessage("GPT Assistant", data.reply);
        })
        .catch(error => {
            console.log("Error:", error); // Log errors
            spinner.style.display = "none"; // Hide the spinner on error
            appendMessage("GPT Assistant", "Sorry, there was an error processing your request.");
        });

        inputBox.value = "";
    }
});

function appendMessage(sender, message) {
    var chatBox = document.getElementById("chat-box");
    var messageDiv = document.createElement("div");
    messageDiv.textContent = sender + ": " + message;
    chatBox.appendChild(messageDiv);
}

// Include additional functions or code here if needed
