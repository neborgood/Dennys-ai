let engine;

const chat = document.getElementById("chat");
const status = document.getElementById("status");

async function loadAI() {
    try {
        status.innerText = "Loading Denny's AI model...";

        engine = await mlc.CreateMLCEngine(
            "Phi-3.5-mini-instruct-q4f16_1-MLC",
            {
                initProgressCallback: (progress) => {
                    status.innerText = progress.text;
                }
            }
        );

        status.innerText = "Denny's AI is ready!";
    } catch (error) {
        status.innerText = "AI failed to load: " + error.message;
        console.log(error);
    }
}

async function sendMessage() {
    const input = document.getElementById("message");
    const text = input.value.trim();

    if (!text || !engine) return;

    addMessage(text, "user");
    input.value = "";

    const response = await engine.chat.completions.create({
        messages: [
            {
                role: "user",
                content: text
            }
        ]
    });

    addMessage(
        response.choices[0].message.content,
        "ai"
    );
}

function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = "message " + type;
    div.innerText = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

loadAI();
