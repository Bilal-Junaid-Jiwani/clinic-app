import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import DiagnosisLog from "@/lib/models/DiagnosisLog";
import User from "@/lib/models/User";
import { askAI } from "@/lib/ai";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== "Doctor") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { symptoms, age, gender, history, patientId } = await req.json();

        if (!symptoms) {
            return NextResponse.json({ error: "Symptoms are required" }, { status: 400 });
        }

        const prompt = `
      You are an expert AI clinical assistant helping a doctor. 
      Patient details:
      - Age: ${age || "Unknown"}
      - Gender: ${gender || "Unknown"}
      - Symptoms: ${symptoms}
      - Medical History: ${history || "None provided"}

      Please provide:
      1. A list of possible conditions.
      2. A designated Risk Level (must be exactly one of: Low, Medium, High, Critical).
      3. Suggested medical tests.

      Format the output clearly. Start the risk level line exactly as "Risk Level: [Level]" so it can be parsed.
    `;

        let aiResponseText = "";
        let riskLevel = "Medium";

        try {
            aiResponseText = await askAI(prompt);

            const riskMatch = aiResponseText.match(/Risk Level:\s*(Low|Medium|High|Critical)/i);
            if (riskMatch && riskMatch[1]) {
                riskLevel = riskMatch[1].charAt(0).toUpperCase() + riskMatch[1].slice(1).toLowerCase();
            }
        } catch (aiError: any) {
            console.error("Claude API Error:", aiError?.message || aiError);
            aiResponseText = "AI Service temporarily unavailable. Please rely on standard medical protocols.";
            riskLevel = "Medium";
        }

        await connectToDatabase();

        // Derive clinicId: from session first, fallback to DB lookup
        let clinicId = (session.user as any).clinicId;
        if (!clinicId) {
            const dbUser = await User.findById((session.user as any).id).select("clinicId role").lean();
            if (dbUser) {
                clinicId = (dbUser as any).role === "Admin"
                    ? (dbUser as any)._id.toString()
                    : (dbUser as any).clinicId?.toString();
            }
        }

        const newDiagnosisLog = await DiagnosisLog.create({
            symptoms,
            aiResponse: aiResponseText,
            riskLevel,
            doctorId: (session.user as any).id,
            patientId: patientId || undefined,
            age: age ? Number(age) : undefined,
            gender: gender || undefined,
            ...(clinicId ? { clinicId } : {}),
        });

        return NextResponse.json({
            diagnosis: newDiagnosisLog
        }, { status: 200 });

    } catch (error: any) {
        console.error("Symptom Checker Fatal Error:", error?.message || error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}
