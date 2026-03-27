import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SymptomChecker } from "@/components/SymptomChecker";

export default async function DoctorAIDiagnosisPage() {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "Doctor") redirect("/");

    const plan = (session?.user as any).subscriptionPlan || "Starter";

    if (plan === "Starter") {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-[#E9E5F5] rounded-3xl shadow-sm mt-8 animate-fade-in relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#7C3AED]/10 blur-[100px] rounded-full pointer-events-none"></div>
                
                <div className="w-20 h-20 bg-gradient-to-br from-[#7C3AED] to-[#4F46E5] rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-3">
                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                
                <h1 className="text-3xl font-black text-[#1E1B3A] mb-4">Pro Architecture Required</h1>
                <p className="text-[#6B6585] max-w-md mb-8 leading-relaxed font-medium">
                    The Advanced AI Diagnosis and Predictive Telemetry engines are strictly locked to Professional and Enterprise nodes. 
                    Please contact your Clinic SuperAdmin to upgrade your architecture tier.
                </p>
                
                <button className="px-8 py-3 bg-[#7C3AED] text-white font-bold rounded-xl shadow-[0_4px_20px_rgba(124,58,237,0.3)] hover:shadow-[0_4px_25px_rgba(124,58,237,0.5)] transition-all opacity-80 cursor-not-allowed">
                    Upgrade Access Level
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-black text-[#1E1B3A] tracking-tight">AI Smart Diagnosis</h1>
                <p className="text-sm text-[#8B85A5] font-medium">Enter patient symptoms and get AI-powered diagnostic assistance.</p>
            </div>
            <SymptomChecker />
        </div>
    );
}

