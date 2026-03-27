import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-[#0F0B2E] selection:bg-[#7C3AED] selection:text-white font-sans overflow-x-hidden pt-20 relative">
            {/* Deep Dark Tech Background */}
            <div className="absolute inset-0 bg-grid-dark pointer-events-none z-0 opacity-20"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-[#7C3AED]/10 blur-[150px] rounded-full pointer-events-none"></div>

            <PublicNav />
            
            <header className="py-32 px-6 max-w-5xl mx-auto text-center relative z-10 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-bold text-[#E9E5F5] mb-8 shadow-sm tracking-widest uppercase backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
                    Architecture Deep Dive
                </div>

                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-8">
                    Precision engineering <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4B5FD] to-[#A78BFA]">for modern medicine.</span>
                </h1>
                <p className="text-xl text-[#A9A3C2] font-medium max-w-2xl mx-auto leading-relaxed">
                    A suite of interconnected modules that leverage state-of-the-art AI to automate redundant workflows and empower practitioners.
                </p>
            </header>

            <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
                {/* Feature Block 1 */}
                <div className="flex flex-col md:flex-row items-center gap-16 mb-40 group">
                    <div className="flex-1 space-y-8 md:pr-10">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#4C1D95] text-white flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.4)]">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <h2 className="text-4xl font-black text-white tracking-tight">AI-Powered Diagnostic Engine</h2>
                        <p className="text-lg text-[#A9A3C2] leading-relaxed font-medium">
                            Synthesize huge volumes of patient history and symptoms in seconds. The symptom checker generates data-driven differential diagnoses, assigns risk probabilities, and recommends immediate next steps to ensure you never miss a critical detail.
                        </p>
                        <ul className="space-y-4 mt-8 text-white font-bold text-sm">
                            <li className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm"><div className="w-2 h-2 rounded-full bg-[#27C93F] shadow-[0_0_10px_#27C93F]"></div> Evidence-based differential suggestions</li>
                            <li className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm"><div className="w-2 h-2 rounded-full bg-[#27C93F] shadow-[0_0_10px_#27C93F]"></div> Automated triage and risk flagging</li>
                            <li className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm"><div className="w-2 h-2 rounded-full bg-[#27C93F] shadow-[0_0_10px_#27C93F]"></div> Learns and adapts to clinic verticals</li>
                        </ul>
                    </div>
                    <div className="flex-1 w-full relative">
                        <div className="absolute inset-0 bg-[#7C3AED] rounded-[2rem] blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
                        <div className="bg-[#1A1145] p-2 rounded-[2rem] border border-white/10 shadow-2xl relative animate-float">
                            <div className="aspect-[4/3] bg-[#0F0B2E] rounded-2xl border border-white/5 overflow-hidden flex flex-col relative">
                                <div className="absolute inset-0 bg-grid-dark opacity-10"></div>
                                <div className="h-10 bg-[#1A1145] border-b border-white/5 flex items-center px-4 gap-2 relative z-10">
                                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div><div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div><div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                                </div>
                                <div className="flex-1 p-8 flex flex-col gap-6 relative z-10">
                                     {/* Fake UI Structure */}
                                     <div className="flex gap-4">
                                         <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#4C1D95] animate-[spin_4s_linear_infinite]"></div>
                                         <div className="flex-1 space-y-2">
                                             <div className="h-4 w-1/3 bg-white/20 rounded"></div>
                                             <div className="h-3 w-1/2 bg-white/10 rounded"></div>
                                         </div>
                                     </div>
                                     <div className="flex-1 border border-[#7C3AED]/30 bg-[#7C3AED]/5 rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#7C3AED] to-transparent animate-scan"></div>
                                        <div className="flex justify-between items-center"><div className="w-24 h-4 bg-white/20 rounded"></div><div className="w-12 h-4 bg-[#10B981]/40 rounded text-[8px] flex justify-center items-center text-[#10B981] font-mono">99.8%</div></div>
                                        <div className="w-full h-8 bg-white/5 rounded mt-2"></div>
                                        <div className="w-full h-8 bg-white/5 rounded"></div>
                                        <div className="w-3/4 h-8 bg-white/5 rounded"></div>
                                     </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feature Block 2 */}
                <div className="flex flex-col-reverse md:flex-row items-center gap-16 mb-40 group">
                    <div className="flex-1 w-full relative">
                        <div className="absolute inset-0 bg-[#FFBD2E] rounded-[2rem] blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity duration-700"></div>
                        <div className="bg-[#1A1145] p-2 rounded-[2rem] border border-white/10 shadow-2xl relative animate-float-delayed">
                            <div className="aspect-[4/3] bg-[#0F0B2E] rounded-2xl border border-white/5 overflow-hidden flex flex-col relative">
                                <div className="absolute inset-0 bg-dot-pattern opacity-10"></div>
                                <div className="h-10 bg-[#1A1145] border-b border-white/5 flex items-center px-4 gap-2 relative z-10">
                                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div><div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div><div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                                </div>
                                <div className="flex-1 p-6 flex gap-6 relative z-10">
                                    <div className="w-24 bg-white/5 border border-white/10 rounded-xl flex flex-col items-center justify-center p-2 gap-2 shadow-inner">
                                        <div className="w-12 h-16 bg-white rounded shadow-sm flex flex-col items-center p-1 gap-1 transform rotate-6 border border-[#E9E5F5]">
                                            <div className="w-8 h-1 bg-[#1A1A1A] rounded-full"></div>
                                            <div className="w-6 h-1 bg-[#E9E5F5] rounded-full"></div>
                                            <div className="w-full h-4 bg-[#7C3AED]/10 rounded mt-auto"></div>
                                        </div>
                                    </div>
                                    <div className="flex-1 flex flex-col gap-4">
                                        <div className="h-12 w-full bg-gradient-to-r from-[#FFBD2E]/20 to-transparent border border-[#FFBD2E]/30 rounded-xl flex items-center px-4">
                                            <div className="w-4 h-4 rounded-full border-2 border-[#FFBD2E] border-t-transparent animate-spin"></div>
                                            <div className="ml-3 h-3 w-32 bg-[#FFBD2E]/40 rounded"></div>
                                        </div>
                                        <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-2">
                                            <div className="w-full h-3 bg-white/20 rounded"></div>
                                            <div className="w-full h-3 bg-white/20 rounded"></div>
                                            <div className="w-2/3 h-3 bg-white/10 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 space-y-8 md:pl-10">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFBD2E] to-[#F59E0B] text-white flex items-center justify-center shadow-[0_0_30px_rgba(255,189,46,0.3)]">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        </div>
                        <h2 className="text-4xl font-black text-white tracking-tight">Frictionless Digital Prescriptions</h2>
                        <p className="text-lg text-[#A9A3C2] leading-relaxed font-medium">
                            Generate verifiable PDF prescriptions dynamically. To improve adherence, our Patient AI Explainer translates complex medical terminology and dosage instructions into simple, layperson language directly on the secure patient portal.
                        </p>
                    </div>
                </div>

                {/* Feature Block 3 */}
                <div className="flex flex-col md:flex-row items-center gap-16 group">
                    <div className="flex-1 space-y-8 md:pr-10">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#059669] text-white flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                        </div>
                        <h2 className="text-4xl font-black text-white tracking-tight">Institutional Analytics at Scale</h2>
                        <p className="text-lg text-[#A9A3C2] leading-relaxed font-medium">
                            Get a real-time pulse on your practice. The architectural data lakes capture operational throughput, tracking patient flow, revenue conversions, and population health metadata. Understand exactly where the bottlenecks are in millisecond time.
                        </p>
                    </div>
                    <div className="flex-1 w-full relative">
                        <div className="absolute inset-0 bg-[#10B981] rounded-[2rem] blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity duration-700"></div>
                        <div className="bg-[#1A1145] p-2 rounded-[2rem] border border-white/10 shadow-2xl relative animate-float">
                            <div className="aspect-[4/3] bg-[#0F0B2E] rounded-2xl border border-white/5 overflow-hidden flex flex-col relative">
                                <div className="absolute inset-0 bg-grid-dark opacity-10"></div>
                                <div className="h-10 bg-[#1A1145] border-b border-white/5 flex items-center px-4 gap-2 relative z-10">
                                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div><div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div><div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                                </div>
                                <div className="flex-1 p-6 grid grid-cols-2 gap-4 relative z-10">
                                     <div className="col-span-2 h-24 bg-white/5 border border-white/10 rounded-xl flex items-end px-4 py-2 gap-3 shadow-inner">
                                         <div className="w-full bg-[#10B981]/20 h-[30%] rounded-t border-t border-[#10B981] hover:h-[40%] transition-all"></div>
                                         <div className="w-full bg-[#10B981]/40 h-[60%] rounded-t border-t border-[#10B981] hover:h-[70%] transition-all"></div>
                                         <div className="w-full bg-[#10B981] h-[95%] rounded-t border-t border-[#34D399] shadow-[0_0_15px_#10B981]"></div>
                                         <div className="w-full bg-[#10B981]/50 h-[70%] rounded-t border-t border-[#10B981] hover:h-[80%] transition-all"></div>
                                         <div className="w-full bg-[#10B981]/30 h-[50%] rounded-t border-t border-[#10B981] hover:h-[60%] transition-all"></div>
                                     </div>
                                     <div className="h-28 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center relative overflow-hidden">
                                        <div className="w-16 h-16 border-4 border-[#FFBD2E] border-b-transparent border-l-transparent rounded-full transform rotate-45 animate-spin"></div>
                                        <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-white font-bold">+82%</div>
                                     </div>
                                     <div className="h-28 bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-end gap-2">
                                        <div className="text-3xl font-black text-white">4,289</div>
                                        <div className="text-[#A9A3C2] text-xs font-mono">Total Throughput</div>
                                     </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="py-32 px-6 text-center max-w-4xl mx-auto relative z-10">
                <div className="absolute inset-0 bg-gradient-to-t from-[#7C3AED]/20 to-transparent blur-3xl rounded-full pointer-events-none opacity-50"></div>
                <h2 className="text-5xl font-black text-white mb-8 tracking-tight">Shift to an intelligent workflow.</h2>
                <a href="/login" className="glow-border inline-block">
                    <div className="px-10 py-5 bg-white text-[#1E1B3A] rounded-2xl text-lg font-black hover:bg-[#F5F3FF] transition-colors relative z-10 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                        Start Building Your Organization Profile
                    </div>
                </a>
            </section>

            <PublicFooter />
        </div>
    );
}
