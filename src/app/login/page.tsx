"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        const result = await signIn("credentials", { email, password, redirect: false });
        if (result?.error) { setError("Invalid email or password."); setLoading(false); }
        else { router.push("/"); router.refresh(); }
    };

    const features = [
        { icon: "M13 10V3L4 14h7v7l9-11h-7z", text: "AI-Powered Smart Diagnosis" },
        { icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", text: "Digital Prescriptions & PDF" },
        { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", text: "Complete Patient Management" },
        { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", text: "Real-Time Analytics Dashboard" },
    ];

    const demoAccounts = [
        { role: "Admin", email: "admin@test.com", pw: "admin123", color: "from-[#7C3AED] to-[#6D28D9]" },
        { role: "Doctor", email: "doctor@test.com", pw: "doctor123", color: "from-[#0EA5E9] to-[#0284C7]" },
        { role: "Receptionist", email: "receptionist@test.com", pw: "rec123", color: "from-[#EC4899] to-[#DB2777]" },
        { role: "Patient", email: "patient@test.com", pw: "patient123", color: "from-[#F59E0B] to-[#D97706]" },
    ];

    const inputClasses = "w-full px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all duration-200 text-white placeholder-slate-500";

    return (
        <div className="min-h-screen flex flex-col lg:flex-row" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            {/* ─────────────── LEFT BRANDING PANEL ─────────────── */}
            <div
                className="hidden lg:flex lg:w-[50%] relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #0F0B2E 0%, #1A1145 40%, #1E0F4A 100%)" }}
            >
                {/* Decorative orbs */}
                <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-[0.12]"
                    style={{ background: "radial-gradient(circle, #8B5CF6, transparent 70%)" }} />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.06]"
                    style={{ background: "radial-gradient(circle, #A78BFA, transparent 70%)" }} />

                {/* Content wrapper - centered both horizontally and vertically */}
                <div className="relative z-10 flex flex-col justify-between w-full h-full px-14 xl:px-20 py-10">
                    {/* Top Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow-[0_0_24px_rgba(139,92,246,0.5)] font-black text-white text-xl"
                            style={{ background: "linear-gradient(135deg, #8B5CF6, #7C3AED)" }}>
                            A
                        </div>
                        <div>
                            <h1 className="text-xl font-black text-white tracking-tight">Aether</h1>
                            <p className="text-[11px] font-bold text-[#A78BFA]/60 uppercase tracking-widest">Enterprise Architecture</p>
                        </div>
                    </div>

                    {/* Center Hero */}
                    <div className="flex-1 flex flex-col justify-center py-8">
                        <div className="max-w-lg">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 mb-6">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
                                <span className="text-xs font-bold text-[#C4B5FD] tracking-wider">AETHER OS INFRASTRUCTURE</span>
                            </div>
                            <h2 className="text-4xl xl:text-5xl font-black text-white leading-[1.1] tracking-tight mb-5">
                                The Future of<br />
                                <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg,#A78BFA,#C4B5FD,#DDD6FE)" }}>
                                    Healthcare
                                </span><br />
                                Management
                            </h2>
                            <p className="text-slate-400 text-base font-medium leading-relaxed mb-8 max-w-md">
                                Streamline clinic operations, reduce paperwork, and enhance patient care with our AI-driven platform.
                            </p>

                            <div className="grid grid-cols-1 gap-2.5">
                                {features.map((f, i) => (
                                    <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] transition-colors">
                                        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(139, 92, 246, 0.15)" }}>
                                            <svg className="w-4.5 h-4.5 text-[#C4B5FD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={f.icon} />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-semibold text-slate-300">{f.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom stats */}
                    <div className="flex items-center gap-8">
                        {[["4", "User Roles"], ["AI", "Diagnosis Engine"], ["Live", "on Vercel"]].map(([v, l]) => (
                            <div key={l}>
                                <p className="text-2xl font-black text-white">{v}</p>
                                <p className="text-xs text-slate-500 font-semibold">{l}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ─────────────── RIGHT LOGIN FORM ─────────────── */}
            <div className="flex-1 flex items-center justify-center px-6 py-10 lg:px-16 relative"
                style={{ background: "linear-gradient(180deg, #130E30 0%, #0F0B2E 100%)" }}>

                <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-[0.06]"
                    style={{ background: "radial-gradient(circle, #8B5CF6, transparent)" }} />

                <div className="w-full max-w-sm relative z-10">
                    {/* Mobile logo */}
                    <div className="lg:hidden flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white"
                            style={{ background: "linear-gradient(135deg, #8B5CF6, #7C3AED)" }}>
                            A
                        </div>
                        <span className="text-lg font-black text-white">Aether</span>
                    </div>

                    <h2 className="text-3xl font-black text-white mb-1 tracking-tight">Welcome back</h2>
                    <p className="text-slate-400 text-sm font-medium mb-8">Sign in to your medical workspace</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                            <input
                                type="email"
                                required
                                placeholder="doctor@clinic.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className={inputClasses}
                                style={{ background: "rgba(255,255,255,0.08)", border: "2px solid rgba(255,255,255,0.15)" }}
                                onFocus={e => { e.target.style.borderColor = "#8B5CF6"; e.target.style.background = "rgba(255,255,255,0.12)"; }}
                                onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.15)"; e.target.style.background = "rgba(255,255,255,0.08)"; }}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Password</label>
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className={inputClasses}
                                style={{ background: "rgba(255,255,255,0.08)", border: "2px solid rgba(255,255,255,0.15)" }}
                                onFocus={e => { e.target.style.borderColor = "#8B5CF6"; e.target.style.background = "rgba(255,255,255,0.12)"; }}
                                onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.15)"; e.target.style.background = "rgba(255,255,255,0.08)"; }}
                            />
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                                <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <p className="text-red-400 text-sm font-semibold">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 rounded-xl font-bold text-white text-sm tracking-wide transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                            style={{ background: loading ? "#6D28D9" : "linear-gradient(135deg,#7C3AED,#8B5CF6)", boxShadow: "0 6px 24px rgba(124,58,237,0.4)" }}
                        >
                            {loading && <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
                            {loading ? "Signing in..." : "Sign In to Workspace"}
                        </button>
                    </form>

                    {/* Demo Accounts */}
                    <div className="mt-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Demo Access</span>
                            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
                        </div>
                        <div className="grid grid-cols-2 gap-2.5">
                            {demoAccounts.map((acc) => (
                                <button
                                    key={acc.role}
                                    type="button"
                                    onClick={() => { setEmail(acc.email); setPassword(acc.pw); }}
                                    className="group text-left cursor-pointer p-3.5 rounded-xl transition-all duration-200"
                                    style={{ background: "rgba(255,255,255,0.03)", border: "1.5px solid rgba(255,255,255,0.08)" }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.16)"; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
                                >
                                    <span className={`inline-block text-[10px] font-black px-2 py-0.5 rounded-md text-white mb-1.5 bg-gradient-to-r ${acc.color}`}>{acc.role}</span>
                                    <p className="text-xs text-slate-400 font-medium truncate">{acc.email}</p>
                                    <p className="text-[10px] text-slate-600 font-semibold">{acc.pw}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

