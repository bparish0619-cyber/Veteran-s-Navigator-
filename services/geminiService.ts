
import { GoogleGenAI } from "@google/genai";
import type { Source } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `You are an expert AI assistant specializing in U.S. Department of Veterans Affairs (VA) benefits. Your primary knowledge base is the Code of Federal Regulations (CFR) Title 38. When a user asks a question, provide a clear, helpful, and empathetic answer based on these regulations. If the question requires current information or information outside of the 38 CFR, use your web search capabilities. Always cite your web sources. Do not provide legal or medical advice. Instead, recommend the user consult a VSO (Veterans Service Officer), accredited agent, or attorney, or the VA directly for official guidance on their specific case. Format your answers clearly using markdown for readability (e.g., headings, bold text, lists).`;

export const getVABenefitsResponse = async (prompt: string): Promise<{ text: string; sources: Source[] }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text;
    
    const rawSources = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const sources: Source[] = (rawSources || [])
      .map((chunk: any) => ({
        uri: chunk.web?.uri,
        title: chunk.web?.title,
      }))
      .filter((source: Source) => source.uri && source.title);

    // Deduplicate sources based on URI
    const uniqueSources = Array.from(new Map(sources.map(s => [s.uri, s])).values());

    return { text, sources: uniqueSources };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get response from AI model.");
  }
};
