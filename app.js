let engine;

const chat = document.getElementById("chat");
const status = document.getElementById("status");

async function loadAI() {
    status.innerText = "Loading Denny's AI model...";

    engine = await mlc.LLMChat.create({
        model: "Llama-3.2-3B-Instruct-q4f16_1-MLC"
    });

    status.innerText = "Denny's AI is ready!";
}

async function sendMessage() {
    const input = document.getElementById("message");
    const text = input.value.trim();

    if (!text || !engine) return;

    addMessage(text, "user");
    input.value = "";

    status.innerText = "Thinking...";

    const reply = await engine.chat.completions.create({
        messages: [
            {
                role: "user",
                content: text
            }
        ]
    });

    addMessage(
        reply.choices[0].message.content,
        "ai"
    );

    status.innerText = "Denny's AI is ready!";
}

function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = "message " + type;
    div.innerText = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

loadAI();
