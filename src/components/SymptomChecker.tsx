"use client";

import { useState } from "react";

export function SymptomChecker() {
    const [symptoms, setSymptoms] = useState("");
    const [age, setAge] = useState("");
    const [history, setHistory] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState("");

    const handleCheck = async () => {
        if (!symptoms) {
            setError("Please enter symptoms.");
            return;
        }
        setError("");
        setLoading(true);
        setResult(null);

        try {
            const res = await fetch("/api/ai/symptom-checker", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ symptoms, age, history }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to analyze symptoms");

            setResult(data.diagnosis);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-card p-6 mt-6 border-t-4 border-t-[#7C3AED]">
            <h2 className="text-xl font-bold mb-2 text-[#1E1B3A] flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#F5F3FF] flex items-center justify-center text-[#7C3AED]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                </div>
                Smart Symptom Checker
            </h2>
            <p className="text-[#8B85A5] text-sm mb-6">Enter patient symptoms to get AI-powered condition probabilities, risk levels, and recommended tests.</p>

            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-[#6B6585] uppercase tracking-wider mb-1.5">Patient Age</label>
                        <input
                            type="number"
                            className="premium-input text-sm"
                            placeholder="e.g. 45"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-[#6B6585] uppercase tracking-wider mb-1.5">Relevant Medical History</label>
                        <input
                            type="text"
                            className="premium-input text-sm"
                            placeholder="e.g. Hypertension, Diabetic"
                            value={history}
                            onChange={(e) => setHistory(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-[#6B6585] uppercase tracking-wider mb-1.5">Current Symptoms *</label>
                    <textarea
                        rows={3}
                        className="premium-input w-full text-sm"
                        placeholder="Describe symptoms in detail..."
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                    ></textarea>
                </div>

                {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

                <button
                    onClick={handleCheck}
                    disabled={loading}
                    className="btn-primary flex gap-2 items-center"
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                            Analyzing...
                        </span>
                    ) : "Analyze Symptoms"}
                </button>
            </div>

            {result && (
                <div className="mt-6 p-5 bg-[#FAFAFE] rounded-xl border border-[#E9E5F5]">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-[#1E1B3A] text-lg">AI Diagnosis Suggestions</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${result.riskLevel === 'Critical' ? 'bg-red-100 text-red-700' :
                                result.riskLevel === 'High' ? 'bg-orange-100 text-orange-700' :
                                    result.riskLevel === 'Medium' ? 'bg-amber-100 text-amber-700' :
                                        'bg-emerald-100 text-emerald-700'
                            }`}>
                            {result.riskLevel} RISK
                        </span>
                    </div>
                    <div className="prose prose-sm text-[#4A4568] max-w-none whitespace-pre-wrap">
                        {result.aiResponse}
                    </div>
                    <div className="mt-4 pt-4 border-t border-[#E9E5F5] text-xs text-[#8B85A5] italic">
                        Disclaimer: This is an AI-generated suggestion and should not replace professional medical judgment.
                    </div>
                </div>
            )}
        </div>
    );
}
