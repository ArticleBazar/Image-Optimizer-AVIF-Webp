import { GoogleGenAI } from "@google/genai";

// Fix: Initialize the GoogleGenAI client directly with the environment variable as per the coding guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function describeImage(base64Data: string, mimeType: string): Promise<string> {
    try {
        const imagePart = {
            inlineData: {
                data: base64Data,
                mimeType,
            },
        };

        const textPart = {
            text: 'Briefly describe this image in a single, compelling sentence for an image CDN service showcase. Focus on the main subject and mood.',
        };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
        });

        const text = response.text;
        if (!text) {
            return "AI analysis could not generate a description.";
        }
        return text.trim();

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get image description from AI.");
    }
}