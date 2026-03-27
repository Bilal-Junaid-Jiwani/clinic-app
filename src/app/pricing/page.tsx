import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-[#0F0B2E] selection:bg-[#7C3AED] selection:text-white font-sans overflow-x-hidden pt-20 relative">
            <div className="absolute inset-0 bg-grid-dark pointer-events-none z-0 opacity-20"></div>
            <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#7C3AED]/10 blur-[150px] rounded-full pointer-events-none"></div>

            <PublicNav />
            
            <header className="py-24 px-6 max-w-5xl mx-auto text-center relative z-10 animate-fade-in">
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6">
                    Radically simple pricing.
                </h1>
                <p className="text-xl text-[#A9A3C2] font-medium max-w-2xl mx-auto leading-relaxed">
                    Access institutional-grade architecture for a fraction of legacy enterprise software costs.
                </p>
            </header>

            <section className="py-8 px-6 max-w-7xl mx-auto mb-32 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    
                    {/* Starter */}
                    <div className="bg-[#1A1145] p-8 border border-white/10 rounded-3xl hover:border-white/20 transition-colors flex flex-col relative group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <h3 className="text-xl font-bold text-white mb-2 relative z-10">Starter Node</h3>
                        <p className="text-[#8B85A5] text-sm mb-8 relative z-10">For independent practitioners.</p>
                        <div className="mb-8 relative z-10">
                            <span className="text-5xl font-black text-white">$29</span>
                            <span className="text-[#8B85A5] font-medium">/mo</span>
                        </div>
                        <a href="/register?plan=Starter" className="block w-full text-center py-4 px-4 rounded-xl font-bold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors mb-8 relative z-10">
                            Initialize Node
                        </a>
                        <ul className="space-y-4 text-sm font-medium text-[#A9A3C2] flex-1 relative z-10">
                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-white/50"></div> 1 Practitioner Account</li>
                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-white/50"></div> 2 Support Staff</li>
                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-white/50"></div> 500 Patient Records</li>
                            <li className="flex items-center gap-3 text-[#6B6585]"><div className="w-1.5 h-1.5 rounded-full bg-transparent border border-[#6B6585]"></div> No Neural Diagnostic Access</li>
                        </ul>
                    </div>

                    {/* Pro */}
                    <div className="bg-[#0F0B2E] p-8 border border-[#7C3AED]/50 rounded-3xl relative transform md:-translate-y-4 shadow-[0_0_80px_rgba(124,58,237,0.15)] flex flex-col group overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7C3AED] via-[#4C1D95] to-[#7C3AED]"></div>
                        <div className="absolute top-0 right-0 p-4">
                            <div className="bg-[#7C3AED]/20 text-[#C4B5FD] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-[#7C3AED]/30">Standard Issue</div>
                        </div>
                        
                        <div className="absolute -inset-1 bg-gradient-to-br from-[#7C3AED]/10 to-transparent blur-xl z-0 pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity"></div>

                        <h3 className="text-2xl font-black text-white mb-2 relative z-10">Professional</h3>
                        <p className="text-[#8B85A5] text-sm mb-8 relative z-10">For scaling clinics requiring AI assistance.</p>
                        <div className="mb-8 relative z-10">
                            <span className="text-6xl font-black text-white">$99</span>
                            <span className="text-[#8B85A5] font-medium">/mo</span>
                        </div>
                        
                        <div className="glow-border w-full mb-8 relative z-10">
                            <a href="/register?plan=Professional" className="block w-full text-center py-4 px-4 rounded-xl font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] transition-colors relative z-10 shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                                Upgrade to Professional
                            </a>
                        </div>

                        <ul className="space-y-4 text-sm font-medium text-[#C4B5FD] flex-1 relative z-10">
                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] shadow-[0_0_8px_#7C3AED]"></div> 5 Practitioner Accounts</li>
                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] shadow-[0_0_8px_#7C3AED]"></div> Unlimited Support Staff</li>
                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] shadow-[0_0_8px_#7C3AED]"></div> Unlimited Patient Records</li>
                            <li className="flex items-center gap-3 font-bold text-white"><div className="w-1.5 h-1.5 rounded-full bg-[#27C93F] shadow-[0_0_8px_#27C93F]"></div> Full Neural Diagnostic Engine</li>
                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] shadow-[0_0_8px_#7C3AED]"></div> Institutional Telemetry</li>
                        </ul>
                    </div>

                    {/* Enterprise */}
                    <div className="bg-[#1A1145] p-8 border border-white/10 rounded-3xl hover:border-white/20 transition-colors flex flex-col relative group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <h3 className="text-xl font-bold text-white mb-2 relative z-10">Enterprise</h3>
                        <p className="text-[#8B85A5] text-sm mb-8 relative z-10">Dedicated deployment for hospital networks.</p>
                        <div className="mb-8 relative z-10">
                            <span className="text-4xl font-black text-white">Custom</span>
                        </div>
                        <a href="/register?plan=Enterprise" className="block w-full text-center py-4 px-4 rounded-xl font-bold text-[#1A1145] bg-white hover:bg-[#F5F3FF] transition-colors mb-8 relative z-10">
                            Contact Solutions
                        </a>
                        <ul className="space-y-4 text-sm font-medium text-[#A9A3C2] flex-1 relative z-10">
                            <li className="flex items-center gap-3"><svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> Unlimited Infrastructure</li>
                            <li className="flex items-center gap-3"><svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> Custom AI Model Fine-tuning</li>
                            <li className="flex items-center gap-3"><svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> 99.99% Node SLA</li>
                            <li className="flex items-center gap-3"><svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> 24/7 Priority Architect Support</li>
                        </ul>
                    </div>

                </div>
            </section>

            <PublicFooter />
        </div>
    );
}

