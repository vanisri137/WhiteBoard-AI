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
      contents: `You are an intelligent AI Whiteboard Assistant.

You are given:

1. An image of the current whiteboard.
2. Structured JSON describing all whiteboard elements.

Your tasks are:

1. Identify every object, drawing, handwritten text, symbol and shape.

2. Infer what the user is trying to communicate even if the drawing is incomplete.

3. Describe the overall theme in exactly five beautiful sentences.

4. If the drawing looks incomplete,
suggest additional elements that should be added.

5. If the drawing already represents something meaningful,
suggest improvements instead of generic advice.

Do NOT simply list shapes.

Recognize real-world objects whenever possible.`,
    });

    return response.text || "No suggestions available.";
  } catch (err) {
    console.error("Gemini Error:", err);
    return "Failed to generate AI suggestions.";
  }
};
