import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY
});
export const getAISuggestions = async (elements: any[]) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      
contents: `
You are an AI whiteboard assistant.

Analyze the whiteboard and provide:

1. Diagram Analysis (2-3 sentences)
2. 5 Improvement Suggestions
3. Recommended Next Step

Keep the response under 250 words.
Use headings and bullet points.
`
    });

    return response.text || "No suggestions available";
  } catch (err) {
    console.error("Gemini Error:", err);
    return "Failed to generate suggestions.";
  }
};
