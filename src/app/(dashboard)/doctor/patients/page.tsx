"use client";
import { useState, useEffect } from "react";
import { PrescriptionGenerator } from "@/components/PrescriptionGenerator";

// Helper for SVGs
const SvgIcon = ({ path }: { path: string }) => (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={path} />
    </svg>
);

export default function DoctorPatientsPage() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPatient, setSelectedPatient] = useState<any>(null);
    const [history, setHistory] = useState<any>({ appointments: [], prescriptions: [] });
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [activeTab, setActiveTab] = useState<"history" | "prescription">("history");

    useEffect(() => {
        fetch("/api/patients")
            .then(r => r.json())
            .then(d => setPatients(d.patients || []))
            .finally(() => setLoading(false));
    }, []);

    const viewHistory = async (patient: any) => {
        setSelectedPatient(patient);
        setActiveTab("history");
        setLoadingHistory(true);
        try {
            const res = await fetch(`/api/patients/${patient._id}/history`);
            if (res.ok) setHistory(await res.json());
        } catch (e) { console.error(e); }
        finally { setLoadingHistory(false); }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-black text-[#1E1B3A] tracking-tight">Patient Records</h1>
                <p className="text-sm text-[#8B85A5] font-medium">View patient profiles and medical history.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Patient List */}
                <div className="lg:col-span-1 glass-card overflow-hidden">
                    <div className="p-4 border-b border-[#E9E5F5]"><h3 className="font-bold text-[#1E1B3A]">All Patients</h3></div>
                    {loading ? <div className="p-6"><div className="skeleton h-4 w-full mb-3"></div><div className="skeleton h-4 w-3/4"></div></div> :
                        <div className="divide-y divide-[#F1EFF8]">
                            {patients.map((p: any) => (
                                <button key={p._id} onClick={() => viewHistory(p)} className={`w-full text-left px-4 py-3 hover:bg-[#F5F3FF] transition flex items-center gap-3 ${selectedPatient?._id === p._id ? "bg-[#F5F3FF] border-l-4 border-[#7C3AED]" : ""}`}>
                                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs"
                                        style={{ background: "linear-gradient(135deg, #8B5CF6, #7C3AED)" }}>{p.name?.charAt(0)}</div>
                                    <div><p className="text-sm font-semibold text-[#1E1B3A]">{p.name}</p><p className="text-xs text-[#8B85A5]">{p.age}y, {p.gender}</p></div>
                                </button>
                            ))}
                        </div>}
                </div>

                {/* Medical History */}
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
                                    <button
                                        onClick={() => setActiveTab("history")}
                                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "history" ? "bg-white text-[#1E1B3A] shadow-sm" : "text-[#8B85A5] hover:text-[#6B6585]"}`}
                                    >
                                        Timeline
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("prescription")}
                                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "prescription" ? "bg-white text-[#7C3AED] shadow-sm" : "text-[#8B85A5] hover:text-[#6B6585]"}`}
                                    >
                                        Write Rx
                                    </button>
                                </div>
                            </div>

                            {activeTab === "history" ? (
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
                                                                <p className="text-xs text-emerald-600">{item.medicines?.map((m: any) => m.name).join(", ") || "No medicines listed"}</p>
                                                                {item.instructions && <p className="text-xs text-emerald-500 mt-1">{item.instructions}</p>}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <PrescriptionGenerator
                                    patientId={selectedPatient._id}
                                    onSuccess={() => {
                                        viewHistory(selectedPatient);
                                        setActiveTab("history");
                                    }}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
