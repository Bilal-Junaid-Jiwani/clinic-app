"use client";
import { useState, useEffect } from "react";
import { PrescriptionGenerator } from "@/components/PrescriptionGenerator";

export default function DoctorPatientsPage() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPatient, setSelectedPatient] = useState<any>(null);
    const [history, setHistory] = useState<any>({ appointments: [], prescriptions: [] });
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [activeTab, setActiveTab] = useState<"history" | "prescription" | "risk">("history");
    const [riskData, setRiskData] = useState<any>(null);
    const [loadingRisk, setLoadingRisk] = useState(false);
    const [riskError, setRiskError] = useState("");

    useEffect(() => {
        fetch("/api/patients")
            .then(r => r.json())
            .then(d => setPatients(d.patients || []))
            .finally(() => setLoading(false));
    }, []);

    const viewHistory = async (patient: any) => {
        setSelectedPatient(patient);
        setActiveTab("history");
        setRiskData(null);
        setRiskError("");
        setLoadingHistory(true);
        try {
            const res = await fetch(`/api/patients/${patient._id}/history`);
            if (res.ok) setHistory(await res.json());
        } catch (e) { console.error(e); }
        finally { setLoadingHistory(false); }
    };

    const runRiskAnalysis = async () => {
        if (!selectedPatient) return;
        setLoadingRisk(true);
        setRiskError("");
        try {
            const res = await fetch("/api/ai/risk-flagging", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ patientId: selectedPatient._id }),
            });
            const data = await res.json();
            if (!res.ok) {
                setRiskError(data.error || "Failed");
                if (data.upgrade) setRiskError("⚡ AI Risk Flagging requires a Pro plan. Please contact your admin to upgrade.");
            } else {
                setRiskData(data.riskFlags);
            }
        } catch (e: any) { setRiskError(e.message); }
        finally { setLoadingRisk(false); }
    };

    const riskBadgeColor = (risk: string) => {
        switch (risk) {
            case "Critical": return "bg-red-100 text-red-700 border-red-200";
            case "High": return "bg-orange-100 text-orange-700 border-orange-200";
            case "Medium": return "bg-amber-100 text-amber-700 border-amber-200";
            default: return "bg-emerald-100 text-emerald-700 border-emerald-200";
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-black text-[#1E1B3A] tracking-tight">Patient Records</h1>
                <p className="text-sm text-[#8B85A5] font-medium">View patient profiles, medical history, and AI risk analysis.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Patient List */}
                <div className="lg:col-span-1 glass-card overflow-hidden">
                    <div className="p-4 border-b border-[#E9E5F5]"><h3 className="font-bold text-[#1E1B3A]">All Patients</h3></div>
                    {loading ? <div className="p-6"><div className="skeleton h-4 w-full mb-3"></div><div className="skeleton h-4 w-3/4"></div></div> :
                        <div className="divide-y divide-[#F1EFF8] max-h-[600px] overflow-y-auto">
                            {patients.map((p: any) => (
                                <button key={p._id} onClick={() => viewHistory(p)} className={`w-full text-left px-4 py-3 hover:bg-[#F5F3FF] transition flex items-center gap-3 ${selectedPatient?._id === p._id ? "bg-[#F5F3FF] border-l-4 border-[#7C3AED]" : ""}`}>
                                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs"
                                        style={{ background: "linear-gradient(135deg, #8B5CF6, #7C3AED)" }}>{p.name?.charAt(0)}</div>
                                    <div><p className="text-sm font-semibold text-[#1E1B3A]">{p.name}</p><p className="text-xs text-[#8B85A5]">{p.age}y, {p.gender}</p></div>
                                </button>
                            ))}
                        </div>}
                </div>

                {/* Detail Panel */}
                <div className="lg:col-span-2 glass-card p-6">
                    {!selectedPatient ? (
                        <div className="text-center text-[#8B85A5] py-16"><p className="text-4xl mb-2">👈</p><p>Select a patient to view their medical history.</p></div>
                    ) : loadingHistory ? (
                        <div className="py-16 text-center"><div className="skeleton h-4 w-48 mx-auto mb-3"></div></div>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E9E5F5]">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md"
                                        style={{ background: "linear-gradient(135deg, #7C3AED, #4C1D95)" }}>{selectedPatient.name?.charAt(0)}</div>
                                    <div>
                                        <h2 className="text-xl font-extrabold text-[#1E1B3A]">{selectedPatient.name}</h2>
                                        <p className="text-sm font-medium text-[#8B85A5]">{selectedPatient.age} years • {selectedPatient.gender} • {selectedPatient.contact}</p>
                                    </div>
                                </div>
                                <div className="flex bg-[#F1EFF8] p-1 rounded-xl">
                                    {(["history", "prescription", "risk"] as const).map(tab => (
                                        <button key={tab} onClick={() => { setActiveTab(tab); if (tab === "risk" && !riskData && !riskError) runRiskAnalysis(); }}
                                            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === tab ? (tab === "risk" ? "bg-white text-red-600 shadow-sm" : tab === "prescription" ? "bg-white text-[#7C3AED] shadow-sm" : "bg-white text-[#1E1B3A] shadow-sm") : "text-[#8B85A5] hover:text-[#6B6585]"}`}>
                                            {tab === "history" ? "Timeline" : tab === "prescription" ? "Write Rx" : "⚠ Risk AI"}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {activeTab === "history" && (
                                <div>
                                    <h3 className="section-title mb-4">Medical Timeline</h3>
                                    {history.appointments.length === 0 && history.prescriptions.length === 0 ? (
                                        <p className="text-[#8B85A5] text-sm">No medical history records found.</p>
                                    ) : (
                                        <div className="space-y-0">
                                            {[...history.appointments.map((a: any) => ({ ...a, type: "appointment", sortDate: a.date })),
                                            ...history.prescriptions.map((p: any) => ({ ...p, type: "prescription", sortDate: p.createdAt }))]
                                                .sort((a: any, b: any) => new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime())
                                                .map((item: any, i: number) => (
                                                    <div key={i} className="timeline-item">
                                                        <p className="text-xs text-[#8B85A5] mb-1">{new Date(item.sortDate).toLocaleDateString()}</p>
                                                        {item.type === "appointment" ? (
                                                            <div className="bg-[#EFF6FF] rounded-xl p-3 border border-blue-100">
                                                                <p className="text-sm font-semibold text-blue-800">📅 Appointment</p>
                                                                <p className="text-xs text-blue-600">Status: {item.status} • Doctor: {item.doctorId?.name || "N/A"}</p>
                                                            </div>
                                                        ) : (
                                                            <div className="bg-[#ECFDF5] rounded-xl p-3 border border-emerald-100">
                                                                <p className="text-sm font-semibold text-emerald-800">💊 Prescription</p>
                                                                {item.diagnosis && <p className="text-xs text-emerald-700 font-medium mt-0.5">Diagnosis: {item.diagnosis}</p>}
                                                                <p className="text-xs text-emerald-600">{item.medicines?.map((m: any) => m.name).join(", ") || "No medicines listed"}</p>
                                                                {item.instructions && <p className="text-xs text-emerald-500 mt-1">{item.instructions}</p>}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === "prescription" && (
                                <PrescriptionGenerator
                                    patientId={selectedPatient._id}
                                    onSuccess={() => {
                                        viewHistory(selectedPatient);
                                        setActiveTab("history");
                                    }}
                                />
                            )}

                            {activeTab === "risk" && (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="section-title">AI Risk Assessment</h3>
                                        <button onClick={runRiskAnalysis} disabled={loadingRisk} className="text-xs font-bold text-[#7C3AED] hover:text-[#4C1D95] transition-colors">
                                            {loadingRisk ? "Analyzing..." : "↻ Re-analyze"}
                                        </button>
                                    </div>

                                    {loadingRisk && (
                                        <div className="p-8 text-center">
                                            <div className="w-8 h-8 border-3 border-[#7C3AED] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                                            <p className="text-sm text-[#8B85A5]">AI is analyzing patient history...</p>
                                        </div>
                                    )}

                                    {riskError && (
                                        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">{riskError}</div>
                                    )}

                                    {riskData && !loadingRisk && (
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase border ${riskBadgeColor(riskData.overallRisk)}`}>
                                                    {riskData.overallRisk} Risk
                                                </span>
                                                <span className="text-xs text-[#8B85A5]">
                                                    Based on {riskData.dataPoints?.totalAppointments || 0} visits, {riskData.dataPoints?.totalPrescriptions || 0} prescriptions, {riskData.dataPoints?.totalDiagnoses || 0} AI diagnoses
                                                </span>
                                            </div>
                                            <div className="prose prose-sm text-[#4A4568] max-w-none whitespace-pre-wrap bg-[#FAFAFE] p-5 rounded-xl border border-[#E9E5F5]">
                                                {riskData.aiAnalysis}
                                            </div>
                                            <p className="text-xs text-[#8B85A5] italic">This AI assessment is advisory only and should not replace clinical judgment.</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
