const input = document.getElementById("user-input");
const messagesDiv = document.getElementById("messages");

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  addMessage("You", message, "user");
  input.value = "";

  // Replace with your real webhook
  const webhookUrl = "https://chat.n8nfasima.uk/webhook/app";

  // Show typing indicator
  const typingEl = addMessage("Bot", "…", "bot", true);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
    const data = await response.json();

    // Replace typing indicator
    typingEl.remove();
    addMessage("Bot", data.output || JSON.stringify(data), "bot");
  } catch (err) {
    typingEl.remove();
    addMessage("Error", err.toString(), "bot");
  }
}

function addMessage(sender, text, type, isTyping = false) {
  const msg = document.createElement("div");
  msg.classList.add("message", type);
  msg.textContent = isTyping ? "Bot is typing…" : text;
  messagesDiv.appendChild(msg);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
  return msg;
}
