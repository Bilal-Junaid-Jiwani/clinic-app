"use client";

import { useState } from "react";

export function PrescriptionExplainer() {
    const [prescriptionText, setPrescriptionText] = useState("");
    const [language, setLanguage] = useState("en");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string>("");
    const [error, setError] = useState("");

    const handleExplain = async () => {
        if (!prescriptionText) {
            setError("Please put in some prescription details.");
            return;
        }
        setError("");
        setLoading(true);
        setResult("");

        try {
            const res = await fetch("/api/ai/explain-prescription", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prescriptionText, language }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to explain prescription");

            setResult(data.explanation);
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
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                AI Prescription Explainer
            </h2>
            <p className="text-[#8B85A5] text-sm mb-6">
                Paste your doctor&apos;s prescription instructions here to get a simple, easy-to-understand breakdown.
            </p>

            <div className="space-y-4">
                <div>
                    <textarea
                        rows={4}
                        className="premium-input w-full text-sm"
                        placeholder="e.g. Needs to take Paracetamol 500mg twice a day for 5 days. Avoid cold water."
                        value={prescriptionText}
                        onChange={(e) => setPrescriptionText(e.target.value)}
                    ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mt-4">
                    <div className="flex gap-4 w-full sm:w-auto">
                        <label className="flex items-center gap-2 text-sm text-[#4A4568] cursor-pointer font-medium">
                            <input
                                type="radio"
                                name="lang"
                                value="en"
                                checked={language === "en"}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="accent-[#7C3AED]"
                            />
                            English Explanation
                        </label>
                        <label className="flex items-center gap-2 text-sm text-[#4A4568] cursor-pointer font-medium">
                            <input
                                type="radio"
                                name="lang"
                                value="ur"
                                checked={language === "ur"}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="accent-[#7C3AED]"
                            />
                            Urdu Mode (اردو)
                        </label>
                    </div>

                    <button
                        onClick={handleExplain}
                        disabled={loading}
                        className="btn-primary w-full sm:w-auto"
                    >
                        {loading ? "Translating..." : "Explain It To Me"}
                    </button>
                </div>

                {error && <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>}
            </div>

            {result && (
                <div className="mt-6 p-5 bg-[#F5F3FF] rounded-xl border border-[#E9E5F5]">
                    <h3 className="font-bold text-[#4C1D95] text-lg mb-3">AI Explanation:</h3>
                    <div className="prose prose-sm text-[#4A4568] max-w-none whitespace-pre-wrap leading-relaxed" dir={language === 'ur' ? 'rtl' : 'ltr'}>
                        {result}
                    </div>
                </div>
            )}
        </div>
    );
}
