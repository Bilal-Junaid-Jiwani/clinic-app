import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { askAI } from "@/lib/ai";

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
            explanation = await askAI(prompt);
        } catch (aiError: any) {
            console.error("Claude API Error:", aiError?.message || aiError);
            explanation = language === "ur"
                ? "AI سروس فی الحال دستیاب نہیں ہے۔ براہ کرم اپنے ڈاکٹر سے رجوع کریں۔"
                : "AI Service temporarily unavailable. Please consult your doctor for clarification.";
        }

        return NextResponse.json({ explanation }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
