import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export const getAISuggestions = async (elements: any[]) => {
  try {
    // Convert whiteboard elements into a readable description
    const boardDescription =
      elements.length > 0
        ? elements
            .map((element) => {
              switch (element.type) {
                case "text":
                  return `Text: "${element.text}"`;

                case "rectangle":
                  return "Rectangle";

                case "circle":
                  return "Circle";

                case "line":
                  return "Freehand drawing";

                case "arrow":
                  return "Arrow";

                default:
                  return element.type || "Unknown Element";
              }
            })
            .join("\n")
        : "The whiteboard is currently empty.";

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are an AI brainstorming assistant.

Below is the current whiteboard content:

${boardDescription}

Analyze the whiteboard and provide:

1. A short summary of the ideas.
2. Missing points or improvements.
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
