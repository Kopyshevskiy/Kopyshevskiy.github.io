import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { PROJECTS, PROFILE } from "../data";

let ai: GoogleGenAI | null = null;

const getAIClient = (): GoogleGenAI => {
  if (!ai) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API_KEY not found in environment variables. Chat features will be disabled.");
      throw new Error("API Key missing");
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

const SYSTEM_INSTRUCTION = `
You are a helpful AI assistant for ${PROFILE.name}'s personal portfolio website.
Your goal is to answer questions about ${PROFILE.name}'s background, research, and projects based strictly on the following information.
Keep your answers concise, professional, and slightly academic but accessible.
If a question is unrelated to the portfolio, politely steer the conversation back to the professional work.

Profile:
${JSON.stringify(PROFILE)}

Projects:
${JSON.stringify(PROJECTS)}
`;

export const sendMessageToGemini = async (
  history: { role: 'user' | 'model'; text: string }[],
  newMessage: string
): Promise<string> => {
  try {
    const client = getAIClient();
    
    // We use gemini-2.5-flash for low latency interactions suitable for a chat widget
    const modelId = "gemini-2.5-flash";

    // Construct the full prompt context for a stateless request (or use chat sessions if preferred)
    // For this simple widget, we will just use generateContent with system instructions.
    // Ideally, we'd use chats.create(), but for a simple single-turn or short context, this is robust.
    
    const chat = client.chats.create({
      model: modelId,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        maxOutputTokens: 300, 
      }
    });

    // Replay history to state
    // Note: In a real prod app, we would persist the chat session object. 
    // Here we re-hydrate somewhat simplistically for the demo.
    for (const msg of history) {
      if (msg.role === 'user') {
        await chat.sendMessage({ message: msg.text });
      } 
      // Note: We can't easily force-feed model responses in the SDK history without lower-level manipulation,
      // so for this lightweight demo, we just send the new message effectively.
      // A more robust implementation would maintain the `chat` instance in a React Ref or Context.
    }

    const response: GenerateContentResponse = await chat.sendMessage({ message: newMessage });
    
    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently unable to access the neural network. Please try again later or email me directly.";
  }
};
