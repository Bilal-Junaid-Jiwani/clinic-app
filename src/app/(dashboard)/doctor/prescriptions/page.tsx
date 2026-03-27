"use client";
import { useState, useEffect } from "react";
import { PrescriptionGenerator } from "@/components/PrescriptionGenerator";

const SvgIcon = ({ path }: { path: string }) => (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={path} />
    </svg>
);

export default function DoctorPrescriptionsPage() {
    const [prescriptions, setPrescriptions] = useState([]);
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"history" | "new">("history");
    const [selectedPatient, setSelectedPatient] = useState("");

    useEffect(() => { loadData(); }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [rxRes, ptRes] = await Promise.all([
                fetch("/api/prescriptions"),
                fetch("/api/patients")
            ]);
            if (rxRes.ok) {
                const data = await rxRes.json();
                setPrescriptions(data.prescriptions || []);
            }
            if (ptRes.ok) {
                const data = await ptRes.json();
                setPatients(data.patients || []);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-black text-[#1E1B3A] tracking-tight">Prescriptions</h1>
                    <p className="text-sm text-[#8B85A5] font-medium">Manage patient prescriptions and use AI for medicine suggestions.</p>
                </div>
                <div className="flex bg-[#F1EFF8] p-1 rounded-xl w-full sm:w-auto">
                    <button
                        onClick={() => setActiveTab("history")}
                        className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "history" ? "bg-white text-[#1E1B3A] shadow-sm" : "text-[#8B85A5] hover:text-[#6B6585]"}`}
                    >
                        History
                    </button>
                    <button
                        onClick={() => setActiveTab("new")}
                        className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "new" ? "bg-white text-[#7C3AED] shadow-sm" : "text-[#8B85A5] hover:text-[#6B6585]"}`}
                    >
                        + New Rx
                    </button>
                </div>
            </div>

            {activeTab === "new" ? (
                <div className="max-w-4xl mx-auto">
                    <div className="glass-card p-6 mb-6 border border-[#E9E5F5]">
                        <label className="block text-xs font-bold text-[#6B6585] uppercase tracking-wider mb-2">Select Patient for Prescription</label>
                        <select
                            className="premium-input w-full"
                            value={selectedPatient}
                            onChange={(e) => setSelectedPatient(e.target.value)}
                        >
                            <option value="">-- Choose Patient --</option>
                            {patients.map((p: any) => (
                                <option key={p._id} value={p._id}>{p.name} (Age: {p.age}, {p.contact})</option>
                            ))}
                        </select>
                    </div>

                    {selectedPatient ? (
                        <PrescriptionGenerator
                            patientId={selectedPatient}
                            onSuccess={() => {
                                loadData();
                                setActiveTab("history");
                            }}
                        />
                    ) : (
                        <div className="text-center py-16 text-[#8B85A5] glass-card">
                            <p className="text-4xl mb-3">👨‍⚕️</p>
                            <p className="font-medium">Please select a patient to start writing a prescription.</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="glass-card overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center"><div className="skeleton h-4 w-48 mx-auto"></div></div>
                    ) : prescriptions.length === 0 ? (
                        <div className="p-12 text-center text-[#8B85A5]">
                            <p className="text-4xl mb-2">💊</p>
                            <p>No prescriptions found.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-[#F1EFF8]">
                            {prescriptions.map((rx: any) => (
                                <div key={rx._id} className="p-6 hover:bg-[#FAFAFE] transition flex flex-col md:flex-row gap-6 md:items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] flex items-center justify-center text-emerald-600">
                                            <SvgIcon path="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-[#1E1B3A]">{rx.patientId?.name || "Unknown Patient"}</h3>
                                            <p className="text-sm text-[#8B85A5]">{new Date(rx.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex-1 bg-white border border-[#E9E5F5] p-4 rounded-xl shadow-sm">
                                        <p className="text-xs font-bold text-[#8B85A5] uppercase tracking-wider mb-2">Medicines</p>
                                        <div className="flex flex-wrap gap-2">
                                            {rx.medicines?.map((m: any, i: number) => (
                                                <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F5F3FF] text-[#7C3AED] border border-[#E9E5F5]">
                                                    {m.name} ({m.dosage})
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
