import Groq from "groq-sdk";

let client: Groq | null = null;

function getClient(): Groq {
    if (!client) {
        client = new Groq({ apiKey: process.env.GROQ_API_KEY! });
    }
    return client;
}

export async function askAI(prompt: string): Promise<string> {
    const groq = getClient();
    const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1024,
    });
    return response.choices[0]?.message?.content || "No response generated.";
}
