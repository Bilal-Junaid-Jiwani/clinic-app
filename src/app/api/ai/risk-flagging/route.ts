import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Appointment from "@/lib/models/Appointment";
import Prescription from "@/lib/models/Prescription";
import DiagnosisLog from "@/lib/models/DiagnosisLog";
import Patient from "@/lib/models/Patient";
import { GoogleGenAI } from "@google/genai";
import { checkPlanAccess } from "@/lib/planGate";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "Doctor") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Plan gating
        const { allowed, userPlan } = await checkPlanAccess("Pro");
        if (!allowed) {
            return NextResponse.json({
                error: "AI Risk Flagging requires a Pro plan.",
                currentPlan: userPlan,
                upgrade: true,
            }, { status: 403 });
        }

        const { patientId } = await req.json();
        if (!patientId) {
            return NextResponse.json({ error: "Patient ID required" }, { status: 400 });
        }

        await connectToDatabase();

        // Fetch patient data
        const patient = await Patient.findById(patientId).lean();
        if (!patient) return NextResponse.json({ error: "Patient not found" }, { status: 404 });

        // Fetch all history
        const appointments = await Appointment.find({ patientId }).sort({ date: -1 }).limit(20).lean();
        const prescriptions = await Prescription.find({ patientId }).sort({ createdAt: -1 }).limit(20).lean();
        const diagnosisLogs = await DiagnosisLog.find({ patientId }).sort({ createdAt: -1 }).limit(20).lean();

        const historyContext = {
            patient: { name: (patient as any).name, age: (patient as any).age, gender: (patient as any).gender },
            appointmentCount: appointments.length,
            prescriptions: prescriptions.map((rx: any) => ({
                medicines: rx.medicines?.map((m: any) => m.name).join(", "),
                diagnosis: rx.diagnosis || "N/A",
                date: rx.createdAt,
            })),
            diagnoses: diagnosisLogs.map((d: any) => ({
                symptoms: d.symptoms,
                riskLevel: d.riskLevel,
                date: d.createdAt,
            })),
        };

        const prompt = `
You are an AI clinical risk assessment system. Analyze this patient's medical history and flag any risks.

Patient: ${JSON.stringify(historyContext)}

Please identify:
1. **Repeated Infection Patterns** — Any symptoms/conditions appearing more than once
2. **Chronic Symptom Indicators** — Signs of ongoing/chronic conditions
3. **High-Risk Drug Combinations** — Any potentially dangerous medicine interactions
4. **Overall Risk Assessment** — Low, Medium, High, or Critical

Format clearly with headers. If no data is available, state that more visits are needed for accurate assessment.
Start with "Overall Risk: [Level]" on the first line.
`;

        let aiResponse = "";
        let overallRisk = "Low";

        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
            });
            aiResponse = response.text || "No response generated.";

            const riskMatch = aiResponse.match(/Overall Risk:\s*(Low|Medium|High|Critical)/i);
            if (riskMatch?.[1]) {
                overallRisk = riskMatch[1].charAt(0).toUpperCase() + riskMatch[1].slice(1).toLowerCase();
            }
        } catch (aiError) {
            console.error("AI Risk Flagging Error:", aiError);
            aiResponse = "AI Service temporarily unavailable. Manual review recommended.";
        }

        return NextResponse.json({
            riskFlags: {
                overallRisk,
                aiAnalysis: aiResponse,
                dataPoints: {
                    totalAppointments: appointments.length,
                    totalPrescriptions: prescriptions.length,
                    totalDiagnoses: diagnosisLogs.length,
                },
            },
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
