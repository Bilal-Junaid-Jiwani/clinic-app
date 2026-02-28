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
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-800 flex items-center gap-2">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                Smart Symptom Checker
            </h2>
            <p className="text-gray-500 text-sm mb-6">Enter patient symptoms to get AI-powered condition probabilities, risk levels, and recommended tests.</p>

            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Patient Age</label>
                        <input
                            type="number"
                            className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-indigo-500 focus:border-indigo-500 text-sm outline-none"
                            placeholder="e.g. 45"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Relevant Medical History</label>
                        <input
                            type="text"
                            className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-indigo-500 focus:border-indigo-500 text-sm outline-none"
                            placeholder="e.g. Hypertension, Diabetic"
                            value={history}
                            onChange={(e) => setHistory(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Symptoms *</label>
                    <textarea
                        rows={3}
                        className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-indigo-500 focus:border-indigo-500 text-sm outline-none"
                        placeholder="Describe symptoms in detail..."
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                    ></textarea>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    onClick={handleCheck}
                    disabled={loading}
                    className="px-5 py-2.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition font-medium flex gap-2 items-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            Analyzing...
                        </span>
                    ) : "Analyze Symptoms"}
                </button>
            </div>

            {result && (
                <div className="mt-6 p-5 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-semibold text-gray-800 text-lg">AI Diagnosis Suggestions</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${result.riskLevel === 'Critical' ? 'bg-red-100 text-red-700' :
                                result.riskLevel === 'High' ? 'bg-orange-100 text-orange-700' :
                                    result.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-green-100 text-green-700'
                            }`}>
                            {result.riskLevel} RISK
                        </span>
                    </div>
                    <div className="prose prose-sm text-gray-700 max-w-none whitespace-pre-wrap">
                        {result.aiResponse}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500 italic">
                        Disclaimer: This is an AI-generated suggestion and should not replace professional medical judgment.
                    </div>
                </div>
            )}
        </div>
    );
}
