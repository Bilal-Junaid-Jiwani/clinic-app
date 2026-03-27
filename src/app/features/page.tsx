import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-[#FAFAFE] selection:bg-[#1A1A1A] selection:text-white font-sans overflow-x-hidden pt-20">
            <PublicNav />
            
            <header className="py-24 px-6 max-w-5xl mx-auto text-center animate-fade-in">
                <h1 className="text-5xl md:text-7xl font-black text-[#1A1A1A] tracking-tight leading-[1.1] mb-6">
                    Precision engineering <br /> for modern medicine.
                </h1>
                <p className="text-xl text-[#6B6585] font-medium max-w-2xl mx-auto leading-relaxed">
                    A suite of interconnected modules that leverage state-of-the-art AI to automate redundant workflows and empower practitioners.
                </p>
            </header>

            <section className="py-16 px-6 max-w-7xl mx-auto">
                {/* Feature Block 1 */}
                <div className="flex flex-col md:flex-row items-center gap-16 mb-32 group">
                    <div className="flex-1 space-y-6 md:pr-10">
                        <div className="w-12 h-12 rounded-xl bg-[#F5F3FF] text-[#7C3AED] flex items-center justify-center">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <h2 className="text-3xl font-black text-[#1A1A1A] tracking-tight">AI-Powered Diagnostic Engine</h2>
                        <p className="text-lg text-[#6B6585] leading-relaxed font-medium">
                            Synthesize huge volumes of patient history and symptoms in seconds. The symptom checker generates data-driven differential diagnoses, assigns risk probabilities, and recommends immediate next steps to ensure you never miss a critical detail.
                        </p>
                        <ul className="space-y-3 mt-6 text-[#1A1A1A] font-bold text-sm">
                            <li className="flex items-center gap-3"><svg className="w-5 h-5 text-[#27C93F]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg> Evidence-based differential suggestions</li>
                            <li className="flex items-center gap-3"><svg className="w-5 h-5 text-[#27C93F]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg> Automated triage and risk flagging</li>
                            <li className="flex items-center gap-3"><svg className="w-5 h-5 text-[#27C93F]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg> Learns and adapts to clinic verticals</li>
                        </ul>
                    </div>
                    <div className="flex-1 w-full relative">
                        <div className="absolute inset-0 bg-[#7C3AED] rounded-[2rem] blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                        <div className="glass-card p-2 rounded-[2rem] border border-[#E9E5F5] shadow-2xl bg-white/50 relative">
                            <div className="aspect-[4/3] bg-white rounded-2xl border border-[#F1EFF8] overflow-hidden flex flex-col">
                                <div className="h-10 bg-[#F8F7FC] border-b border-[#E9E5F5] flex items-center px-4 gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#E9E5F5]"></div><div className="w-2.5 h-2.5 rounded-full bg-[#E9E5F5]"></div>
                                </div>
                                <div className="flex-1 p-6 flex flex-col gap-4">
                                     <div className="h-8 bg-[#F5F3FF] w-1/3 rounded-lg"></div>
                                     <div className="grid grid-cols-2 gap-4">
                                         <div className="h-10 bg-[#F1EFF8] rounded-lg"></div>
                                         <div className="h-10 bg-[#F1EFF8] rounded-lg"></div>
                                     </div>
                                     <div className="flex-1 bg-[#F8F7FC] rounded-lg border border-[#F1EFF8] flex items-center justify-center p-4">
                                        <div className="w-full space-y-3">
                                            <div className="h-6 w-full bg-white rounded shadow-sm"></div>
                                            <div className="h-6 w-5/6 bg-white rounded shadow-sm"></div>
                                            <div className="h-6 w-4/6 bg-white rounded shadow-sm"></div>
                                        </div>
                                     </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feature Block 2 */}
                <div className="flex flex-col-reverse md:flex-row items-center gap-16 mb-32 group">
                    <div className="flex-1 w-full relative">
                        <div className="absolute inset-0 bg-[#10B981] rounded-[2rem] blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                        <div className="glass-card p-2 rounded-[2rem] border border-[#E9E5F5] shadow-2xl bg-white/50 relative">
                            <div className="aspect-[4/3] bg-white rounded-2xl border border-[#F1EFF8] overflow-hidden flex flex-col">
                                <div className="h-10 bg-[#F8F7FC] border-b border-[#E9E5F5] flex items-center px-4 gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#E9E5F5]"></div><div className="w-2.5 h-2.5 rounded-full bg-[#E9E5F5]"></div>
                                </div>
                                <div className="flex-1 p-6 flex gap-4">
                                    <div className="w-20 bg-[#F8F7FC] rounded-lg flex flex-col gap-2 p-2">
                                        <div className="w-full h-8 bg-white rounded"></div>
                                        <div className="w-full h-8 bg-white rounded"></div>
                                        <div className="w-full h-8 bg-[#10B981]/10 rounded"></div>
                                    </div>
                                    <div className="flex-1 flex flex-col gap-4">
                                        <div className="h-12 w-full bg-[#F5F3FF] border border-[#E9E5F5] rounded-xl"></div>
                                        <div className="flex-1 bg-[#FAFAFE] border border-[#F1EFF8] rounded-xl flex items-center justify-center">
                                            <div className="w-20 h-28 bg-white shadow-md border border-[#E9E5F5]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 space-y-6 md:pl-10">
                        <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] text-[#10B981] flex items-center justify-center">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        </div>
                        <h2 className="text-3xl font-black text-[#1A1A1A] tracking-tight">Frictionless Digital Prescriptions & Explainer</h2>
                        <p className="text-lg text-[#6B6585] leading-relaxed font-medium">
                            Generate verifiable PDF prescriptions dynamically. To improve adherence, our Patient AI Explainer translates complex medical terminology and dosage instructions into simple, layperson language (and regional languages like Urdu) right on the patient portal.
                        </p>
                    </div>
                </div>

                {/* Feature Block 3 */}
                <div className="flex flex-col md:flex-row items-center gap-16 group">
                    <div className="flex-1 space-y-6 md:pr-10">
                        <div className="w-12 h-12 rounded-xl bg-[#FFF7ED] text-[#F97316] flex items-center justify-center">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                        </div>
                        <h2 className="text-3xl font-black text-[#1A1A1A] tracking-tight">Institutional Analytics at Scale</h2>
                        <p className="text-lg text-[#6B6585] leading-relaxed font-medium">
                            Get a real-time pulse on your practice. The Admin architecture captures operational data, tracking patient throughput, revenue conversions, and population health metadata. Understand exactly where the bottlenecks are.
                        </p>
                    </div>
                    <div className="flex-1 w-full relative">
                        <div className="absolute inset-0 bg-[#F97316] rounded-[2rem] blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                        <div className="glass-card p-2 rounded-[2rem] border border-[#E9E5F5] shadow-2xl bg-white/50 relative">
                            <div className="aspect-[4/3] bg-white rounded-2xl border border-[#F1EFF8] overflow-hidden flex flex-col">
                                <div className="h-10 bg-[#F8F7FC] border-b border-[#E9E5F5] flex items-center px-4 gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#E9E5F5]"></div><div className="w-2.5 h-2.5 rounded-full bg-[#E9E5F5]"></div>
                                </div>
                                <div className="flex-1 p-6 grid grid-cols-2 gap-4">
                                     <div className="col-span-2 h-20 bg-white border border-[#E9E5F5] rounded-xl flex items-end px-4 py-2 gap-2 shadow-sm">
                                         <div className="w-8 bg-[#F5F3FF] h-[30%] rounded-t"></div>
                                         <div className="w-8 bg-[#F5F3FF] h-[50%] rounded-t"></div>
                                         <div className="w-8 bg-[#7C3AED] h-[90%] rounded-t"></div>
                                         <div className="w-8 bg-[#F5F3FF] h-[60%] rounded-t"></div>
                                         <div className="w-8 bg-[#F5F3FF] h-[40%] rounded-t"></div>
                                     </div>
                                     <div className="h-24 bg-white border border-[#E9E5F5] rounded-xl flex items-center justify-center shadow-sm">
                                        <div className="w-12 h-12 border-4 border-[#10B981] border-l-transparent rounded-full transform rotate-45"></div>
                                     </div>
                                     <div className="h-24 bg-[#FAFAFE] border border-[#F1EFF8] rounded-xl space-y-2 p-4">
                                         <div className="w-full h-3 rounded bg-[#E9E5F5]"></div>
                                         <div className="w-2/3 h-3 rounded bg-[#E9E5F5]"></div>
                                     </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="py-24 px-6 text-center max-w-4xl mx-auto">
                <h2 className="text-4xl font-black text-[#1A1A1A] mb-8">Shift to an intelligent workflow.</h2>
                <a href="/login" className="px-8 py-4 bg-[#1A1A1A] text-white rounded-xl text-lg font-bold hover:bg-black transition-all shadow-xl hover:-translate-y-1 inline-block">
                    Start Building Your Organization Profile
                </a>
            </section>

            <PublicFooter />
        </div>
    );
}
