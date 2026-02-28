"use client";

import { useState } from "react";

export function PrescriptionExplainer() {
    const [prescriptionText, setPrescriptionText] = useState("");
    const [language, setLanguage] = useState("en"); // 'en' or 'ur'
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
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-800 flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm">✨</span>
                AI Prescription Explainer
            </h2>
            <p className="text-gray-500 text-sm mb-6">
                Paste your doctor's prescription instructions here to get a simple, easy-to-understand breakdown.
            </p>

            <div className="space-y-4">
                <div>
                    <textarea
                        rows={4}
                        className="w-full border-gray-300 rounded-md shadow-sm p-3 border focus:ring-blue-500 focus:border-blue-500 text-sm outline-none bg-gray-50"
                        placeholder="e.g. Needs to take Paracetamol 500mg twice a day for 5 days. Avoid cold water."
                        value={prescriptionText}
                        onChange={(e) => setPrescriptionText(e.target.value)}
                    ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mt-4">
                    <div className="flex gap-4 w-full sm:w-auto">
                        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                            <input
                                type="radio"
                                name="lang"
                                value="en"
                                checked={language === "en"}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="text-blue-600 focus:ring-blue-500"
                            />
                            English Explanation
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                            <input
                                type="radio"
                                name="lang"
                                value="ur"
                                checked={language === "ur"}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="text-blue-600 focus:ring-blue-500"
                            />
                            Urdu Mode (اردو)
                        </label>
                    </div>

                    <button
                        onClick={handleExplain}
                        disabled={loading}
                        className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium flex gap-2 items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? "Translating..." : "Explain It To Me"}
                    </button>
                </div>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            {result && (
                <div className="mt-6 p-5 bg-blue-50 rounded-lg border border-blue-100">
                    <h3 className="font-semibold text-blue-900 text-lg mb-3">AI Explanation:</h3>
                    <div className="prose prose-sm text-gray-800 max-w-none whitespace-pre-wrap leading-relaxed" dir={language === 'ur' ? 'rtl' : 'ltr'}>
                        {result}
                    </div>
                </div>
            )}
        </div>
    );
}
