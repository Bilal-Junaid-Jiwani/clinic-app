"use client";
import { useState, useEffect } from "react";
import jsPDF from "jspdf";

export default function PatientPrescriptionsPage() {
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/prescriptions")
            .then(r => r.json())
            .then(d => setPrescriptions(d.prescriptions || []))
            .finally(() => setLoading(false));
    }, []);

    const downloadPDF = (p: any) => {
        const pdf = new jsPDF("p", "mm", "a4");
        const pageW = pdf.internal.pageSize.getWidth();
        let y = 25;

        // Header
        pdf.setFontSize(24);
        pdf.setTextColor(124, 58, 237);
        pdf.text("Nexis", pageW / 2, y, { align: "center" });
        y += 8;
        pdf.setFontSize(10);
        pdf.setTextColor(120, 120, 120);
        pdf.text("Official Digital Prescription", pageW / 2, y, { align: "center" });
        y += 6;
        pdf.text(`Date: ${new Date(p.createdAt).toLocaleDateString()}`, pageW / 2, y, { align: "center" });
        y += 4;
        pdf.setDrawColor(200, 200, 200);
        pdf.line(20, y, pageW - 20, y);
        y += 10;

        // Doctor
        pdf.setFontSize(11);
        pdf.setTextColor(30, 30, 30);
        pdf.text(`Prescribed by: Dr. ${p.doctorId?.name || "N/A"}`, 20, y);
        y += 10;

        // Diagnosis
        if (p.diagnosis) {
            pdf.setFontSize(13);
            pdf.setTextColor(30, 30, 30);
            pdf.text("Diagnosis", 20, y);
            y += 7;
            pdf.setFontSize(11);
            pdf.text(p.diagnosis, 20, y);
            y += 10;
        }

        // Medicines Table
        pdf.setFontSize(13);
        pdf.text("Rx - Medicines", 20, y);
        y += 8;

        // Table header
        pdf.setFillColor(245, 243, 255);
        pdf.rect(20, y - 1, pageW - 40, 8, "F");
        pdf.setFontSize(9);
        pdf.setTextColor(100, 100, 100);
        pdf.text("Medicine", 25, y + 5);
        pdf.text("Dosage", 80, y + 5);
        pdf.text("Duration", 135, y + 5);
        y += 12;

        // Table rows
        pdf.setTextColor(30, 30, 30);
        (p.medicines || []).forEach((m: any) => {
            pdf.text(m.name || "", 25, y);
            pdf.text(m.dosage || "", 80, y);
            pdf.text(m.duration || "", 135, y);
            y += 8;
        });

        y += 5;

        // Instructions
        if (p.instructions) {
            pdf.setFontSize(13);
            pdf.text("Instructions", 20, y);
            y += 7;
            pdf.setFontSize(10);
            const lines = pdf.splitTextToSize(p.instructions, pageW - 40);
            pdf.text(lines, 20, y);
            y += lines.length * 5 + 5;
        }

        // Signature
        y = Math.max(y + 20, 240);
        pdf.setDrawColor(180, 180, 180);
        pdf.line(pageW - 70, y, pageW - 20, y);
        pdf.setFontSize(9);
        pdf.setTextColor(100, 100, 100);
        pdf.text("Doctor's Signature", pageW - 45, y + 6, { align: "center" });

        pdf.save(`prescription-${p._id}.pdf`);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-black text-[#1E1B3A] tracking-tight">My Prescriptions</h1>
                <p className="text-sm text-[#8B85A5] font-medium">View your prescription history and download PDFs.</p>
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
                                <div className="flex items-center gap-2">
                                    <span className="badge badge-green">Active</span>
                                    <button
                                        onClick={() => downloadPDF(p)}
                                        className="flex items-center gap-1.5 text-xs font-bold text-white px-3 py-1.5 rounded-lg transition-all hover:shadow-lg"
                                        style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                        PDF
                                    </button>
                                </div>
                            </div>

                            {p.diagnosis && (
                                <div className="mb-3 p-3 bg-[#F5F3FF] rounded-xl border border-[#E9E5F5]">
                                    <p className="text-xs font-bold text-[#7C3AED] mb-0.5">Diagnosis</p>
                                    <p className="text-sm text-[#1E1B3A] font-medium">{p.diagnosis}</p>
                                </div>
                            )}

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

