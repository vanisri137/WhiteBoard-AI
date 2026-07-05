import { GoogleGenAI } from "@google/genai";
import type { BoardElement } from "../types";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export const getAISuggestions = async (
  elements: BoardElement[],
  imageBase64: string
) => {
  try {
    const boardContext = JSON.stringify(
      elements.map((element) => ({
        type: element.type,
        text: element.text || "",
        x: element.x,
        y: element.y,
        width: element.width,
        height: element.height,
        radius: element.radius,
      })),
      null,
      2
    );

    const prompt = `
You are an intelligent AI Whiteboard Assistant.

You are given:
1. A rendered image of the whiteboard.
2. Structured JSON describing the whiteboard elements.

Your tasks:

1. Identify all real-world objects, handwritten text, symbols and shapes.
2. Infer what the user is trying to communicate or draw.
3. Describe the overall idea beautifully in exactly 5 lines.
4. If the drawing looks incomplete, suggest additional elements that should be added.
5. If the drawing already represents something meaningful, suggest improvements.
6. Do NOT simply list shapes like rectangle or circle unless nothing else can be inferred.

Whiteboard JSON:

${boardContext}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: prompt,
            },
            {
              inlineData: {
                mimeType: "image/png",
                data: imageBase64,
              },
            },
          ],
        },
      ],
    });

    return response.text || "No suggestions available.";
  } catch (err) {
    console.error(err);
    return "Failed to generate suggestions.";
  }
};
