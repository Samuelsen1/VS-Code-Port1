(function () {
  const chat = document.getElementById("chat");
  const form = document.getElementById("form");
  const input = document.getElementById("input");
  const send = document.getElementById("send");

  const history = [];

  function addMessage(role, text, pushHistory = true) {
    if (pushHistory) {
      history.push({ role, content: text });
      while (history.length > 10) history.shift();
    }
    const div = document.createElement("div");
    div.className = `message ${role}`;
    const label = document.createElement("span");
    label.className = "label";
    label.textContent = role === "user" ? "You" : "AI";
    const p = document.createElement("p");
    p.textContent = text;
    div.appendChild(label);
    div.appendChild(p);
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
    return div;
  }

  function addTyping() {
    const div = document.createElement("div");
    div.className = "message ai typing";
    div.setAttribute("data-typing", "1");
    const label = document.createElement("span");
    label.className = "label";
    label.textContent = "AI";
    const p = document.createElement("p");
    p.textContent = "Thinking…";
    div.appendChild(label);
    div.appendChild(p);
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
    return div;
  }

  function removeTyping(el) {
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  function resizeTextarea() {
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 160) + "px";
  }

  input.addEventListener("input", resizeTextarea);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      form.requestSubmit();
    }
  });

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const raw = input.value.trim();
    if (!raw) return;

    addMessage("user", raw);
    input.value = "";
    resizeTextarea();
    send.disabled = true;

    const typingEl = addTyping();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: raw, history }),
      });
      const data = await res.json();
      removeTyping(typingEl);
      addMessage("ai", data.reply || "No response.");
    } catch (err) {
      removeTyping(typingEl);
      addMessage("ai", "Sorry, something went wrong. Is the server running?");
    } finally {
      send.disabled = false;
      input.focus();
    }
  });

  input.focus();
})();
