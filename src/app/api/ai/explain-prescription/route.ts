import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { prescriptionText, language } = await req.json();

        if (!prescriptionText) {
            return NextResponse.json({ error: "Prescription text required" }, { status: 400 });
        }

        const langInstruction = language === "ur"
            ? "Answer completely in Urdu language (اردو)."
            : "Answer in simple, easy-to-understand English.";

        const prompt = `
      You are a friendly AI clinical assistant explaining a medical prescription to a patient.
      The doctor wrote the following prescription or instructions:
      "${prescriptionText}"

      Please provide:
      1. A simple explanation of what the medicines are for.
      2. Any lifestyle advice, dietary restrictions, or precautions related to this prescription.
      
      ${langInstruction}
    `;

        let explanation = "";

        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
            });

            explanation = response.text || "No explanation generated.";
        } catch (aiError) {
            console.error("Gemini API Error:", aiError);
            explanation = language === "ur"
                ? "AI سروس فی الحال دستیاب نہیں ہے۔ براہ کرم اپنے ڈاکٹر سے رجوع کریں۔"
                : "AI Service temporarily unavailable. Please consult your doctor for clarification.";
        }

        return NextResponse.json({ explanation }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

