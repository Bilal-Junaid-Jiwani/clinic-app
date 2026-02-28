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
        setActiveTab("history"); // Reset tab
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
                <h1 className="text-2xl font-bold text-gray-900">Patient Records</h1>
                <p className="text-sm text-gray-500">View patient profiles and medical history.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Patient List */}
                <div className="lg:col-span-1 glass-card overflow-hidden">
                    <div className="p-4 border-b border-gray-100"><h3 className="font-semibold text-gray-800">All Patients</h3></div>
                    {loading ? <div className="p-6"><div className="skeleton h-4 w-full mb-3"></div><div className="skeleton h-4 w-3/4"></div></div> :
                        <div className="divide-y divide-gray-50">
                            {patients.map((p: any) => (
                                <button key={p._id} onClick={() => viewHistory(p)} className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition flex items-center gap-3 ${selectedPatient?._id === p._id ? "bg-blue-50 border-l-4 border-blue-500" : ""}`}>
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-xs">{p.name?.charAt(0)}</div>
                                    <div><p className="text-sm font-semibold text-gray-900">{p.name}</p><p className="text-xs text-gray-400">{p.age}y, {p.gender}</p></div>
                                </button>
                            ))}
                        </div>}
                </div>

                {/* Medical History */}
                <div className="lg:col-span-2 glass-card p-6">
                    {!selectedPatient ? (
                        <div className="text-center text-gray-400 py-16"><p className="text-4xl mb-2">👈</p><p>Select a patient to view their medical history.</p></div>
                    ) : loadingHistory ? (
                        <div className="py-16 text-center"><div className="skeleton h-4 w-48 mx-auto mb-3"></div></div>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#4f46e5] to-[#312e81] flex items-center justify-center text-white font-bold text-xl shadow-md">{selectedPatient.name?.charAt(0)}</div>
                                    <div>
                                        <h2 className="text-xl font-extrabold text-gray-900">{selectedPatient.name}</h2>
                                        <p className="text-sm font-medium text-gray-500">{selectedPatient.age} years • {selectedPatient.gender} • {selectedPatient.contact}</p>
                                    </div>
                                </div>
                                <div className="flex bg-gray-100 p-1 rounded-xl">
                                    <button
                                        onClick={() => setActiveTab("history")}
                                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "history" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                                    >
                                        Timeline
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("prescription")}
                                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "prescription" ? "bg-white text-[#4f46e5] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                                    >
                                        Write Rx
                                    </button>
                                </div>
                            </div>

                            {activeTab === "history" ? (
                                <div>
                                    <h3 className="section-title mb-4">Medical Timeline</h3>
                                    {history.appointments.length === 0 && history.prescriptions.length === 0 ? (
                                        <p className="text-gray-400 text-sm">No medical history records found.</p>
                                    ) : (
                                        <div className="space-y-0">
                                            {[...history.appointments.map((a: any) => ({ ...a, type: "appointment", sortDate: a.date })),
                                            ...history.prescriptions.map((p: any) => ({ ...p, type: "prescription", sortDate: p.createdAt }))]
                                                .sort((a: any, b: any) => new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime())
                                                .map((item: any, i: number) => (
                                                    <div key={i} className="timeline-item">
                                                        <p className="text-xs text-gray-400 mb-1">{new Date(item.sortDate).toLocaleDateString()}</p>
                                                        {item.type === "appointment" ? (
                                                            <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                                                                <p className="text-sm font-semibold text-blue-800">📅 Appointment</p>
                                                                <p className="text-xs text-blue-600">Status: {item.status} • Doctor: {item.doctorId?.name || "N/A"}</p>
                                                            </div>
                                                        ) : (
                                                            <div className="bg-green-50 rounded-xl p-3 border border-green-100">
                                                                <p className="text-sm font-semibold text-green-800">💊 Prescription</p>
                                                                <p className="text-xs text-green-600">{item.medicines?.map((m: any) => m.name).join(", ") || "No medicines listed"}</p>
                                                                {item.instructions && <p className="text-xs text-green-500 mt-1">{item.instructions}</p>}
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
                                        viewHistory(selectedPatient); // Refresh history
                                        setActiveTab("history"); // Auto switch back to timeline
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
