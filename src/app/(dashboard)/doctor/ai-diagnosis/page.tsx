import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SymptomChecker } from "@/components/SymptomChecker";

export default async function DoctorAIDiagnosisPage() {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "Doctor") redirect("/");

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">AI Smart Diagnosis</h1>
                <p className="text-sm text-gray-500">Enter patient symptoms and get AI-powered diagnostic assistance.</p>
            </div>
            <SymptomChecker />
        </div>
    );
}
