"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export function PrescriptionGenerator({ patientId, onSuccess }: { patientId?: string, onSuccess?: () => void }) {
    const [medicines, setMedicines] = useState([{ name: "", dosage: "", duration: "" }]);
    const [instructions, setInstructions] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // AI Suggestion State
    const [symptoms, setSymptoms] = useState("");
    const [generatingAI, setGeneratingAI] = useState(false);

    const handleAddMedicine = () => {
        setMedicines([...medicines, { name: "", dosage: "", duration: "" }]);
    };

    const handleRemoveMedicine = (index: number) => {
        if (medicines.length === 1) return;
        setMedicines(medicines.filter((_, i) => i !== index));
    };

    const handleMedicineChange = (index: number, field: string, value: string) => {
        const newMedicines = [...medicines];
        (newMedicines[index] as any)[field] = value;
        setMedicines(newMedicines);
    };

    const generatePDF = async () => {
        const element = document.getElementById("prescription-preview");
        if (!element) return;

        element.style.display = "block";
        const canvas = await html2canvas(element, { scale: 2 });
        element.style.display = "none";

        const data = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`prescription-${new Date().getTime()}.pdf`);
    };

    const handleSubmit = async () => {
        if (!medicines[0].name) return;
        setLoading(true);
        setSuccess(false);

        try {
            const res = await fetch("/api/prescriptions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    patientId: patientId || "000000000000000000000000",
                    medicines,
                    instructions,
                    diagnosis: diagnosis || undefined,
                }),
            });

            if (!res.ok) throw new Error("Failed to save prescription to DB");

            await generatePDF();
            setSuccess(true);
            setMedicines([{ name: "", dosage: "", duration: "" }]);
            setInstructions("");
            setDiagnosis("");
            if (onSuccess) onSuccess();
        } catch (err: any) {
            console.error(err);
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAIGenerate = async () => {
        if (!symptoms) {
            alert("Please describe the symptoms first.");
            return;
        }
        setGeneratingAI(true);
        try {
            const res = await fetch("/api/ai/symptom-checker", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ symptoms, includeRx: true })
            });
            const data = await res.json();
            if (res.ok) {
                setInstructions(`AI Suggestion based on "${symptoms}":\n${data.diagnosis?.aiResponse || data.result}\n\n` + instructions);
            } else {
                throw new Error("AI Failed");
            }
        } catch (e) {
            alert("Could not generate AI suggestions.");
        } finally {
            setGeneratingAI(false);
        }
    };

    return (
        <div className="glass-card p-6 mt-6 animate-fade-in border-t-4 border-t-[#7C3AED]">
            <h2 className="text-xl font-bold mb-2 text-[#1E1B3A] flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#F5F3FF] flex items-center justify-center text-[#7C3AED]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                </div>
                Write Prescription
            </h2>
            <p className="text-[#8B85A5] text-sm font-medium mb-6">Prescribe medicines and generate a digitally signed PDF for the patient.</p>

            {/* AI Assistant Section */}
            <div className="mb-6 p-4 rounded-xl border border-[#E9E5F5]" style={{ background: "linear-gradient(135deg, #F5F3FF, #EDE9FE)" }}>
                <label className="block text-xs font-bold text-[#7C3AED] mb-2 uppercase tracking-wider flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    AI Prescription Assistant
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        placeholder="Describe symptoms or condition (e.g., Severe migraine with nausea)"
                        className="premium-input flex-1 text-sm bg-white"
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                    />
                    <button
                        onClick={handleAIGenerate}
                        disabled={generatingAI}
                        className="text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:shadow-lg transition-all disabled:opacity-50 whitespace-nowrap flex items-center justify-center gap-2 cursor-pointer"
                        style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)", boxShadow: "0 4px 14px rgba(124,58,237,0.25)" }}
                    >
                        {generatingAI && <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                        {generatingAI ? "Thinking..." : "Get AI Suggestions"}
                    </button>
                </div>
            </div>

            {/* Diagnosis Field */}
            <div className="mb-6">
                <label className="block text-sm font-bold text-[#4A4568] mb-2">Diagnosis</label>
                <input
                    type="text"
                    className="premium-input text-sm"
                    placeholder="e.g. Acute viral pharyngitis"
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                />
            </div>

            <div className="space-y-4">
                {medicines.map((med, index) => (
                    <div key={index} className="flex flex-col sm:flex-row gap-3 items-end border-b border-[#F1EFF8] pb-4 sm:border-0 sm:pb-0">
                        <div className="w-full sm:flex-1">
                            <label className="block text-xs font-bold text-[#6B6585] mb-1 uppercase tracking-wider">Medicine Name</label>
                            <input
                                type="text"
                                className="premium-input text-sm"
                                placeholder="e.g. Paracetamol"
                                value={med.name}
                                onChange={(e) => handleMedicineChange(index, "name", e.target.value)}
                            />
                        </div>
                        <div className="w-full sm:flex-1">
                            <label className="block text-xs font-bold text-[#6B6585] mb-1 uppercase tracking-wider">Dosage</label>
                            <input
                                type="text"
                                className="premium-input text-sm"
                                placeholder="e.g. 500mg, Twice a day"
                                value={med.dosage}
                                onChange={(e) => handleMedicineChange(index, "dosage", e.target.value)}
                            />
                        </div>
                        <div className="w-full sm:flex-1">
                            <label className="block text-xs font-bold text-[#6B6585] mb-1 uppercase tracking-wider">Duration</label>
                            <input
                                type="text"
                                className="premium-input text-sm"
                                placeholder="e.g. 5 days"
                                value={med.duration}
                                onChange={(e) => handleMedicineChange(index, "duration", e.target.value)}
                            />
                        </div>
                        {medicines.length > 1 && (
                            <button onClick={() => handleRemoveMedicine(index)} className="text-red-400 hover:text-red-600 transition-colors p-2 mb-0.5" title="Remove">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                        )}
                    </div>
                ))}

                <button
                    onClick={handleAddMedicine}
                    className="text-sm text-[#7C3AED] font-bold hover:text-[#6D28D9] transition flex items-center gap-1 mt-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    Add another medicine
                </button>

                <div className="mt-6">
                    <label className="block text-sm font-bold text-[#4A4568] mb-2">General Instructions & Advice</label>
                    <textarea
                        rows={3}
                        className="premium-input w-full text-sm"
                        placeholder="e.g. Drink plenty of water. Rest for 2 days."
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                    ></textarea>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">{success && "✅ Prescription saved successfully!"}</p>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2"
                    >
                        {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                        {loading ? "Processing..." : "Issue Prescription"}
                    </button>
                </div>
            </div>

            {/* Hidden PDF Preview Template */}
            <div id="prescription-preview" className="bg-white p-10 text-gray-800" style={{ display: 'none', width: '800px', border: '1px solid #ccc' }}>
                <div className="text-center mb-10 border-b pb-4">
                    <h1 className="text-3xl font-bold text-[#7C3AED]">Nexis</h1>
                    <p className="text-gray-500">Official Machine-Generated Prescription</p>
                    <p className="text-sm text-gray-400 mt-2">Date: {new Date().toLocaleDateString()}</p>
                </div>

                {diagnosis && (
                    <div className="mb-6">
                        <h2 className="text-xl font-bold border-b pb-2 mb-2">Diagnosis</h2>
                        <p className="text-lg">{diagnosis}</p>
                    </div>
                )}

                <div className="mb-8">
                    <h2 className="text-xl font-bold border-b pb-2 mb-4">Rx - Medicines</h2>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2 border">Medicine</th>
                                <th className="p-2 border">Dosage</th>
                                <th className="p-2 border">Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicines.map((m, i) => (
                                <tr key={i}>
                                    <td className="p-2 border">{m.name}</td>
                                    <td className="p-2 border">{m.dosage}</td>
                                    <td className="p-2 border">{m.duration}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div>
                    <h2 className="text-xl font-bold border-b pb-2 mb-4">Instructions</h2>
                    <p className="whitespace-pre-wrap">{instructions}</p>
                </div>

                <div className="mt-20 pt-10 border-t flex justify-end">
                    <div className="text-center">
                        <p className="line-through text-transparent">____________________</p>
                        <p className="font-bold border-t border-gray-400 pt-2 inline-block">Doctor&apos;s Signature</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

