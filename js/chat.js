document.addEventListener("DOMContentLoaded", async () => {
  const input = document.getElementById("chatInput");
  const sendBtn = document.getElementById("sendBtn");
  const history = document.getElementById("chatHistory");

  if (!sendBtn || !history) return;

  const appendMessage = (text, isUser, sources = []) => {
    const div = document.createElement("div");
    div.className = `chat-msg ${isUser ? "user-msg" : "ai-msg"}`;

    let content = `<p>${text}</p>`;
    if (!isUser && sources.length) {
      content += `
        <div class="source-list">
          <strong>Sources</strong>
          ${sources
            .map(
              (source) => `
                <div class="source-item">📄 ${source.title}<br> ${source.chapter}</div>
              `
            )
            .join("")}
        </div>
      `;
    }

    div.innerHTML = content;
    history.appendChild(div);
    history.scrollTop = history.scrollHeight;
  };

  const handleSend = async (rawText) => {
    const text = rawText.trim();
    if (!text) return;

    appendMessage(text, true);
    input.value = "";

    const typing = document.createElement("div");
    typing.className = "chat-msg ai-msg";
    typing.textContent = "Thinking...";
    history.appendChild(typing);
    history.scrollTop = history.scrollHeight;

    const response = await getChatResponse(text);
    history.removeChild(typing);
    appendMessage(response.text, false, response.sources || []);
  };

  sendBtn.addEventListener("click", () => handleSend(input.value));
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") handleSend(input.value);
  });

  document.querySelectorAll(".suggested-q").forEach((button) => {
    button.addEventListener("click", () => handleSend(button.dataset.question || button.textContent));
  });
});
