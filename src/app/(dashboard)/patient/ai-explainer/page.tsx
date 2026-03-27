import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PrescriptionExplainer } from "@/components/PrescriptionExplainer";

export default async function PatientAIExplainerPage() {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "Patient" && session?.user?.role !== "Doctor") redirect("/");

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-black text-[#1E1B3A] tracking-tight">AI Prescription Explainer</h1>
                <p className="text-sm text-[#8B85A5] font-medium">Paste your prescription and get an AI-powered explanation in simple language or Urdu.</p>
            </div>
            <PrescriptionExplainer />
        </div>
    );
}

