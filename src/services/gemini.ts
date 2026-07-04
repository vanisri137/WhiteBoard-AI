import { GoogleGenAI } from "@google/genai";
import type { BoardElement } from "../types";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export const getAISuggestions = async (elements: BoardElement[]) => {
  try {
    // Convert whiteboard elements into structured JSON
    const boardContext = JSON.stringify(elements, null, 2);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are an AI brainstorming assistant.

The following JSON represents the current whiteboard.

${boardContext}

Analyze the whiteboard and provide:

1. A short summary of the current ideas.
2. Missing ideas or gaps.
3. Suggestions to improve the brainstorming.
4. Recommended next steps.

Keep the response under 250 words.
Use clear headings and bullet points.
`,
    });

    return response.text || "No suggestions available.";
  } catch (err) {
    console.error("Gemini Error:", err);
    return "Failed to generate AI suggestions.";
  }
};
