async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  addMessage("You", message);
  input.value = "";

  // Replace this with your n8n webhook URL
  const webhookUrl = "https://chat.n8nfasima.uk/webhook/app";

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
    const data = await response.json();
    addMessage("Bot", data.output || JSON.stringify(data));
  } catch (err) {
    addMessage("Error", err.toString());
  }
}

function addMessage(sender, text) {
  const messagesDiv = document.getElementById("messages");
  const msg = document.createElement("div");
  msg.textContent = `${sender}: ${text}`;
  messagesDiv.appendChild(msg);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
