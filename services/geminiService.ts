import { GoogleGenAI, Type } from '@google/genai';
import type { NameGenerationResponse } from '../types';
import { SYSTEM_INSTRUCTION } from '../constants';

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    niche: { type: Type.STRING },
    categories: {
      type: Type.OBJECT,
      properties: {
        classic_trustworthy: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        modern_bold: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        creative_punny: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        abstract_unique: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
      },
      required: ['classic_trustworthy', 'modern_bold', 'creative_punny', 'abstract_unique'],
    },
    top3: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          tagline: { type: Type.STRING },
        },
        required: ['name', 'tagline'],
      },
    },
  },
  required: ['niche', 'categories', 'top3'],
};

export async function generateBusinessNames(niche: string): Promise<NameGenerationResponse> {
  const userPrompt = `My business niche is: "${niche}"`;

  try {
    // FIX: Per coding guidelines, initialize GoogleGenAI directly with `process.env.API_KEY`
    // and assume the environment variable is correctly configured.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.9,
      },
    });

    const text = response.text;
    let data: any;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse JSON response:", text);
      throw new Error("The AI returned an invalid format. Please try again.");
    }
    
    // Lightweight validation
    if (!data?.categories || !data?.top3 || !data?.niche) {
        throw new Error("The AI returned an incomplete response. Please try again.");
    }

    return data as NameGenerationResponse;
  } catch (e) {
    console.error('Error calling Gemini API:', e);
    if (e instanceof Error && e.message.includes('API key')) {
        // Re-throw the specific API key error to be displayed to the user.
        throw new Error(e.message);
    }
    throw new Error('Failed to generate names. The API may be busy or an error occurred.');
  }
}
