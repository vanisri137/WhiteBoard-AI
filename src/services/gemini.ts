import { GoogleGenAI } from "@google/genai";
import type { BoardElement } from "../types";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export const getAISuggestions = async (elements: BoardElement[]) => {
  try {
    // Send only useful whiteboard information
    const boardContext = JSON.stringify(
      elements.map((element) => ({
        type: element.type,
        text: element.text || "",
        x: element.x,
        y: element.y,
        width: element.width,
        height: element.height,
        radius: element.radius,
        points: element.points,
      })),
      null,
      2
    );

    const response = await ai.models.generateContent({
      model: "gemini-3-flash",
      contents: `You are an AI Whiteboard Assistant.

You are given:
1. An image of the current whiteboard
2. Structured JSON of the board elements

Your tasks:
1. Identify the real-world objects, drawings, symbols, and text in the whiteboard.
2. Infer what the user is trying to draw or communicate.
3. Describe the scene beautifully in exactly 5 lines.
4. If the drawing looks incomplete, suggest the missing elements that would complete it.
5. Do not describe only shapes like rectangle or circle unless nothing clearer can be inferred.
6. If you are uncertain, say "appears to be" instead of being generic.

Be specific and visual.`,
    });

    return response.text || "No suggestions available.";
  } catch (err) {
    console.error("Gemini Error:", err);
    return "Failed to generate AI suggestions.";
  }
};
