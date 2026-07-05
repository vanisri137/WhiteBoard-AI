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
      model: "gemini-2.5-flash",
      contents: `
You are an AI whiteboard assistant.

Your task has 3 parts:

1. Identify all elements drawn by the user on the whiteboard and analyze what the user is trying to say or build.
2. Describe the whiteboard beautifully in exactly 5 lines.
3. If the theme or idea looks incomplete, suggest the necessary elements that should be added or drawn.

Use the following whiteboard data as context:

${boardContext}

Format the response like this:

### 1. Whiteboard Analysis
...

### 2. Beautiful 5-Line Description
(Line 1)
(Line 2)
(Line 3)
(Line 4)
(Line 5)

### 3. Missing / Suggested Elements
- ...
- ...

Keep the response clear, useful, and concise.
`,
    });

    return response.text || "No suggestions available.";
  } catch (err) {
    console.error("Gemini Error:", err);
    return "Failed to generate AI suggestions.";
  }
};
