import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY
});
export const getAISuggestions = async (elements: any[]) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
Analyze this whiteboard:

${JSON.stringify(elements)}

Give 3 short suggestions for improvement.
`
    });

    return response.text || "No suggestions available";
  } catch (err) {
    console.error("Gemini Error:", err);
    return "Failed to generate suggestions.";
  }
};
