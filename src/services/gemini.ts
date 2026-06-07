import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY
});
export const getAISuggestions = async (elements: any[]) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
  contents: `
You are an expert diagram analyst.

Whiteboard elements:
${JSON.stringify(elements)}

Identify:
1. What the user is trying to draw.
2. Missing labels.
3. Diagram improvements.
4. Potential flowchart/process improvements.

Respond in bullet points.
`
    });

    return response.text || "No suggestions available";
  } catch (err) {
    console.error("Gemini Error:", err);
    return "Failed to generate suggestions.";
  }
};
