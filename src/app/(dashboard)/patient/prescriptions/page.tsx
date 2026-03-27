"use client";
import { useState, useEffect } from "react";

export default function PatientPrescriptionsPage() {
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/prescriptions")
            .then(r => r.json())
            .then(d => setPrescriptions(d.prescriptions || []))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-black text-[#1E1B3A] tracking-tight">My Prescriptions</h1>
                <p className="text-sm text-[#8B85A5] font-medium">View your prescription history and details.</p>
            </div>
            <div className="space-y-4">
                {loading ? (
                    <div className="glass-card p-12 text-center"><div className="skeleton h-4 w-48 mx-auto"></div></div>
                ) : prescriptions.length === 0 ? (
                    <div className="glass-card p-12 text-center text-[#8B85A5]"><p className="text-4xl mb-2">💊</p><p>No prescriptions found.</p></div>
                ) : (
                    prescriptions.map((p: any) => (
                        <div key={p._id} className="glass-card p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="font-bold text-[#1E1B3A]">Prescription</h3>
                                    <p className="text-xs text-[#8B85A5]">By Dr. {p.doctorId?.name || "N/A"} • {new Date(p.createdAt).toLocaleDateString()}</p>
                                </div>
                                <span className="badge badge-green">Active</span>
                            </div>

                            {p.medicines?.length > 0 && (
                                <div className="mb-3">
                                    <p className="text-xs font-bold text-[#8B85A5] uppercase tracking-wider mb-2">Medicines</p>
                                    <div className="space-y-2">
                                        {p.medicines.map((m: any, i: number) => (
                                            <div key={i} className="flex items-center gap-3 bg-[#F8F7FC] p-3 rounded-xl">
                                                <div className="w-8 h-8 rounded-lg bg-[#F5F3FF] flex items-center justify-center text-[#7C3AED]">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-[#1E1B3A]">{m.name}</p>
                                                    <p className="text-xs text-[#8B85A5]">{m.dosage} {m.duration ? `• ${m.duration}` : ""}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {p.instructions && (
                                <div className="bg-[#F5F3FF] p-3 rounded-xl border border-[#E9E5F5] mt-3">
                                    <p className="text-xs font-bold text-[#7C3AED] mb-1">Instructions</p>
                                    <p className="text-sm text-[#4A4568]">{p.instructions}</p>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
