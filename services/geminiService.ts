import { GoogleGenAI, Type } from "@google/genai";
import type { CareerRoadmap } from "../types";

const getAiClient = () => {
    // The API key is injected automatically by the environment.
    // Ensure you have the API_KEY environment variable set.
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const getCareerAdvice = async (prompt: string): Promise<string> => {
    try {
        const ai = getAiClient();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                systemInstruction: `You are an expert career and learning navigator. Based on the user's query, provide a detailed, actionable plan following the '5/5 Interview Readiness Framework'. This framework includes: 1. Skill Mastery, 2. Project Portfolio, 3. Resume/CV Crafting, 4. Mock Interviews, 5. Networking Strategy. Format your response using markdown for clear readability. Be encouraging and clear.`,
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error getting career advice:", error);
        return "Sorry, I encountered an error while generating your career plan. Please try again.";
    }
};

export const createTimetable = async (prompt: string): Promise<string> => {
    try {
        const ai = getAiClient();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                 systemInstruction: `You are a personalized timetable creator. The user will provide their tasks, commitments, and study goals. Create a structured, easy-to-read schedule. Use markdown tables with columns for 'Time', 'Activity', and 'Notes'. Be smart about allocating break times and structure the day logically.`
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error creating timetable:", error);
        return "Sorry, I couldn't generate your timetable. Please check your input and try again.";
    }
};

export const getCareerRoadmap = async (careerQuery: string): Promise<CareerRoadmap> => {
    const ai = getAiClient();
    const prompt = `Generate a detailed, step-by-step career roadmap for becoming a ${careerQuery}. The roadmap should have a clear title and a list of actionable steps, with a title and description for each step.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    title: {
                        type: Type.STRING,
                        description: "The title of the career roadmap."
                    },
                    steps: {
                        type: Type.ARRAY,
                        description: "A list of steps to follow in the roadmap.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                title: {
                                    type: Type.STRING,
                                    description: "The title of the step."
                                },
                                description: {
                                    type: Type.STRING,
                                    description: "A detailed description of the step."
                                }
                            },
                             required: ["title", "description"]
                        }
                    }
                },
                required: ["title", "steps"]
            },
        },
    });

    const jsonText = response.text;
    return JSON.parse(jsonText) as CareerRoadmap;
};
