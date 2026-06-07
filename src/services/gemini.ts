import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY
});

export const getAISuggestions = async () => {
  try {
    console.log("Starting Gemini test");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Say hello"
    });

    console.log("Response:", response);
    console.log("Text:", response.text);

    return [];
  } catch (err) {
    console.error("Gemini Error:", err);
    return [];
  }
};
