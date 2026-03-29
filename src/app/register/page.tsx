"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function RegisterForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialPlan = searchParams.get("plan") || "Free";

    const [step, setStep] = useState(1);
    
    // Step 1: Account Settings
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [plan, setPlan] = useState(initialPlan);
    
    // Step 2: Payment Details
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        
        if (!name || !email || !password) {
            setError("Architecture parameters incomplete.");
            return;
        }

        setStep(2);
    };

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Simulate payment gateway processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (!cardNumber || !expiry || !cvc) {
            setError("Payment protocol failure. Check credentials.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, plan }),
            });

            if (res.ok) {
                setSuccess(true);
            } else {
                const data = await res.json();
                setError(data.error || data.message || "Registration failed");
                setStep(1); // Go back if DB fails
            }
        } catch (err) {
            setError("An error occurred during registration");
            setStep(1);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="bg-[#1A1145] p-8 border border-[#7C3AED]/30 rounded-3xl w-full max-w-md shadow-[0_0_50px_rgba(124,58,237,0.15)] text-center animate-fade-in relative z-10">
                <div className="w-16 h-16 bg-[#10B981]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h2 className="text-3xl font-black text-white mb-4">Payment Processed</h2>
                <p className="text-[#A9A3C2] mb-8 leading-relaxed">
                    Your {plan.toUpperCase()} tier subscription is currently pending approval by the architecture team. You will receive an email once your secure node is provisioned.
                </p>
                <Link href="/" className="text-[#7C3AED] hover:text-[#C4B5FD] font-bold transition-colors">Return to Ecosystem</Link>
            </div>
        );
    }

    return (
        <div className="bg-[#1A1145] p-8 border border-white/10 rounded-3xl w-full max-w-md shadow-2xl relative z-10 animate-fade-in">
            <div className="absolute -inset-1 bg-gradient-to-br from-[#7C3AED]/20 to-transparent blur-xl z-0 pointer-events-none opacity-50"></div>
            
            <div className="relative z-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-white tracking-tight mb-2">
                        {step === 1 ? "Initialize Node" : "Secure Checkout"}
                    </h1>
                    <p className="text-[#8B85A5] text-sm">
                        {step === 1 ? "Provision your Aether workspace." : "Finalize payment protocol for deployment."}
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="flex gap-2 mb-8">
                    <div className={`h-1.5 rounded-full flex-1 transition-colors ${step >= 1 ? 'bg-[#7C3AED]' : 'bg-white/10'}`}></div>
                    <div className={`h-1.5 rounded-full flex-1 transition-colors ${step >= 2 ? 'bg-[#7C3AED]' : 'bg-white/10'}`}></div>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm text-center">
                        {error}
                    </div>
                )}

                {step === 1 ? (
                    <form onSubmit={handleNextStep} className="space-y-5 animate-fade-in">
                        <div>
                            <label className="block text-xs font-bold text-[#A9A3C2] uppercase tracking-wider mb-2">Architecture / Organization Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-[#0F0B2E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                                placeholder="e.g. Acme Medical"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#A9A3C2] uppercase tracking-wider mb-2">Admin Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#0F0B2E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                                placeholder="admin@clinic.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#A9A3C2] uppercase tracking-wider mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#0F0B2E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#A9A3C2] uppercase tracking-wider mb-2">Selected Architecture</label>
                            <select
                                value={plan}
                                onChange={(e) => setPlan(e.target.value)}
                                className="w-full bg-[#0F0B2E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors appearance-none"
                                required
                            >
                                <option value="Starter">Starter Node ($29/mo)</option>
                                <option value="Pro">Professional ($99/mo)</option>
                                <option value="Enterprise">Enterprise (Custom)</option>
                            </select>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full py-4 bg-[#white]/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold transition-colors"
                            >
                                Continue to Payment &rarr;
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleCheckout} className="space-y-5 animate-fade-in relative">
                        
                        {/* Summary Block */}
                        <div className="bg-[#0F0B2E] border border-white/10 rounded-xl p-4 flex justify-between items-center mb-6">
                            <div>
                                <p className="text-xs text-[#A9A3C2] uppercase font-bold tracking-wider mb-1">Due Today</p>
                                <p className="text-white font-bold">{plan === 'Starter' ? '$29.00' : plan === 'Pro' ? '$99.00' : '$0.00'}</p>
                            </div>
                            <button type="button" onClick={() => setStep(1)} className="text-xs text-[#7C3AED] font-bold hover:text-[#C4B5FD] transition-colors">
                                Edit Architecture
                            </button>
                        </div>

                        {/* Payment Gateway Mock */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold flex justify-between text-[#A9A3C2] uppercase tracking-wider mb-2">
                                    <span>Card Number</span>
                                    <span className="flex gap-1">
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    className="w-full bg-[#0F0B2E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors font-mono tracking-widest text-sm"
                                    placeholder="0000 0000 0000 0000"
                                    maxLength={19}
                                    required
                                />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-[#A9A3C2] uppercase tracking-wider mb-2">Expiry</label>
                                    <input
                                        type="text"
                                        value={expiry}
                                        onChange={(e) => setExpiry(e.target.value)}
                                        className="w-full bg-[#0F0B2E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors font-mono tracking-wider text-sm"
                                        placeholder="MM/YY"
                                        maxLength={5}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold flex justify-between text-[#A9A3C2] uppercase tracking-wider mb-2">
                                        <span>CVC</span>
                                        <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </label>
                                    <input
                                        type="text"
                                        value={cvc}
                                        onChange={(e) => setCvc(e.target.value)}
                                        className="w-full bg-[#0F0B2E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors font-mono tracking-wider text-sm"
                                        placeholder="123"
                                        maxLength={4}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl font-bold transition-colors disabled:opacity-50 shadow-[0_0_20px_rgba(124,58,237,0.3)] glow-border"
                            >
                                {loading ? "Authorizing Payment..." : "Initialize & Pay"}
                            </button>
                            <p className="text-center text-[#8B85A5] text-[10px] uppercase font-bold tracking-widest mt-4">
                                Secure Encrypted Transaction
                            </p>
                        </div>
                    </form>
                )}

                {step === 1 && (
                    <p className="mt-8 text-center text-sm text-[#8B85A5]">
                        Already initialized? <Link href="/login" className="text-[#C4B5FD] hover:text-white font-medium transition-colors">Access Terminals</Link>
                    </p>
                )}
            </div>
        </div>
    );
}

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-[#0F0B2E] selection:bg-[#7C3AED] selection:text-white flex flex-col justify-center items-center p-6 relative overflow-hidden font-sans">
            <div className="absolute inset-0 bg-grid-dark pointer-events-none z-0 opacity-20"></div>
            <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#7C3AED]/10 blur-[150px] rounded-full pointer-events-none"></div>
            
            <Link href="/" className="absolute top-8 left-8 text-white/50 hover:text-white flex items-center gap-2 transition-colors z-20">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                <span className="font-medium text-sm">Abort</span>
            </Link>

            <Suspense fallback={<div className="text-white">Loading interface...</div>}>
                <RegisterForm />
            </Suspense>
        </div>
    );
}

