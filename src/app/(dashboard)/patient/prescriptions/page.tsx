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
                <h1 className="text-2xl font-bold text-gray-900">My Prescriptions</h1>
                <p className="text-sm text-gray-500">View your prescription history and details.</p>
            </div>
            <div className="space-y-4">
                {loading ? (
                    <div className="glass-card p-12 text-center"><div className="skeleton h-4 w-48 mx-auto"></div></div>
                ) : prescriptions.length === 0 ? (
                    <div className="glass-card p-12 text-center text-gray-400"><p className="text-4xl mb-2">💊</p><p>No prescriptions found.</p></div>
                ) : (
                    prescriptions.map((p: any) => (
                        <div key={p._id} className="glass-card p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="font-semibold text-gray-900">Prescription</h3>
                                    <p className="text-xs text-gray-400">By Dr. {p.doctorId?.name || "N/A"} • {new Date(p.createdAt).toLocaleDateString()}</p>
                                </div>
                                <span className="badge badge-green">Active</span>
                            </div>

                            {p.medicines?.length > 0 && (
                                <div className="mb-3">
                                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Medicines</p>
                                    <div className="space-y-2">
                                        {p.medicines.map((m: any, i: number) => (
                                            <div key={i} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                                                <span className="text-lg">💊</span>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-900">{m.name}</p>
                                                    <p className="text-xs text-gray-500">{m.dosage} {m.duration ? `• ${m.duration}` : ""}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {p.instructions && (
                                <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 mt-3">
                                    <p className="text-xs font-semibold text-blue-700 mb-1">Instructions</p>
                                    <p className="text-sm text-blue-800">{p.instructions}</p>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
