import { GoogleGenAI, Type } from "@google/genai";
import { BoardElement } from "../types";

const ai = new GoogleGenAI({apiKey: import.meta.env.VITE_GEMINI_API_KEY});

export const getAISuggestions = async (elements: BoardElement[]): Promise<BoardElement[]> => {
  try {
    console.log("AI called");
    console.log("Elements:", elements);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
        Analyze the following whiteboard elements and suggest improvements or auto-completions.
        The elements are in JSON format.
        Current elements: ${JSON.stringify(elements)}
        
        Return a JSON array of NEW or MODIFIED elements that would improve the diagram.
        For example, if there's a rough rectangle, suggest a perfectly aligned one.
        If there's a label missing, suggest one.
        Only return the JSON array of elements.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              type: { type: Type.STRING, enum: ['line', 'rect', 'circle', 'text'] },
              points: { type: Type.ARRAY, items: { type: Type.NUMBER } },
              x: { type: Type.NUMBER },
              y: { type: Type.NUMBER },
              width: { type: Type.NUMBER },
              height: { type: Type.NUMBER },
              radius: { type: Type.NUMBER },
              text: { type: Type.STRING },
              stroke: { type: Type.STRING },
              strokeWidth: { type: Type.NUMBER },
              fill: { type: Type.STRING },
              rotation: { type: Type.NUMBER },
            },
            required: ['id', 'type', 'stroke', 'strokeWidth'],
          },
        },
      },
    });
     console.log("Gemini Response:", response);
    const text = response.text;
    console.log("Response Text:", text);

    if (text) {
      return JSON.parse(text);
    }
    return [];
  } catch (err) {
    console.error('Gemini AI error:', err);
    return [];
  }
};
