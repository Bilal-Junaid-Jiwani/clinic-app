import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-[#FAFAFE] selection:bg-[#1A1A1A] selection:text-white font-sans overflow-x-hidden pt-20">
            <PublicNav />
            
            <header className="py-24 px-6 max-w-5xl mx-auto text-center animate-fade-in">
                <h1 className="text-5xl md:text-7xl font-black text-[#1A1A1A] tracking-tight leading-[1.1] mb-6">
                    Transparent pricing <br /> for modern clinics.
                </h1>
                <p className="text-xl text-[#6B6585] font-medium max-w-2xl mx-auto leading-relaxed">
                    Simple, predictable pricing that scales with your patient volume. Stop paying for bloated legacy software.
                </p>
            </header>

            <section className="py-8 px-6 max-w-7xl mx-auto mb-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    
                    {/* Starter Plan */}
                    <div className="glass-card p-8 border border-[#E9E5F5] hover:border-[#7C3AED]/30 transition-colors bg-white">
                        <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Starter</h3>
                        <p className="text-[#6B6585] text-sm mb-6">Perfect for independent solo practitioners.</p>
                        <div className="mb-6">
                            <span className="text-5xl font-black text-[#1A1A1A]">$29</span>
                            <span className="text-[#6B6585] font-medium">/mo</span>
                        </div>
                        <a href="/login" className="block w-full text-center py-3 px-4 rounded-xl font-bold text-[#1A1A1A] bg-[#F5F3FF] hover:bg-[#E9E5F5] transition-colors mb-8">
                            Start 14-Day Trial
                        </a>
                        <ul className="space-y-4 text-sm font-medium text-[#6B6585]">
                            <li className="flex items-center gap-3"><svg className="w-5 h-5 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> 1 Doctor Account</li>
                            <li className="flex items-center gap-3"><svg className="w-5 h-5 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> 2 Receptionist Accounts</li>
                            <li className="flex items-center gap-3"><svg className="w-5 h-5 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> Up to 500 Patients</li>
                            <li className="flex items-center gap-3 text-[#A9A3C2]"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg> No AI Diagnostic Engine</li>
                        </ul>
                    </div>

                    {/* Pro Plan */}
                    <div className="glass-card p-8 border-2 border-[#7C3AED] relative bg-white transform md:-translate-y-4 shadow-2xl shadow-[#7C3AED]/20">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#7C3AED] text-white text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full">
                            Most Popular
                        </div>
                        <h3 className="text-2xl font-black text-[#1A1A1A] mb-2">Professional</h3>
                        <p className="text-[#6B6585] text-sm mb-6">For growing clinics requiring AI assistance.</p>
                        <div className="mb-6">
                            <span className="text-5xl font-black text-[#1A1A1A]">$99</span>
                            <span className="text-[#6B6585] font-medium">/mo</span>
                        </div>
                        <a href="/login" className="block w-full text-center py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#4C1D95] hover:opacity-90 transition-opacity mb-8 shadow-lg shadow-[#7C3AED]/30">
                            Upgrade to Pro
                        </a>
                        <ul className="space-y-4 text-sm font-medium text-[#6B6585]">
                            <li className="flex items-center gap-3"><svg className="w-5 h-5 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg> Up to 5 Doctor Accounts</li>
                            <li className="flex items-center gap-3"><svg className="w-5 h-5 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg> Unlimited Receptionists</li>
                            <li className="flex items-center gap-3"><svg className="w-5 h-5 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg> Unlimited Patients</li>
                            <li className="flex items-center gap-3 font-bold text-[#1A1A1A]"><svg className="w-5 h-5 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg> Full AI Diagnostic Engine</li>
                            <li className="flex items-center gap-3"><svg className="w-5 h-5 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg> Institutional Analytics</li>
                        </ul>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="glass-card p-8 border border-[#E9E5F5] hover:border-[#7C3AED]/30 transition-colors bg-white">
                        <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Enterprise</h3>
                        <p className="text-[#6B6585] text-sm mb-6">Dedicated deployment for hospital networks.</p>
                        <div className="mb-6">
                            <span className="text-4xl font-black text-[#1A1A1A]">Custom</span>
                        </div>
                        <a href="/login" className="block w-full text-center py-3 px-4 rounded-xl font-bold text-[#1A1A1A] bg-white border-2 border-[#E9E5F5] hover:border-[#1A1A1A] transition-colors mb-8">
                            Contact Sales
                        </a>
                        <ul className="space-y-4 text-sm font-medium text-[#6B6585]">
                            <li className="flex items-center gap-3"><svg className="w-5 h-5 text-[#1A1A1A]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> Unlimited Everything</li>
                            <li className="flex items-center gap-3"><svg className="w-5 h-5 text-[#1A1A1A]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> Custom AI Model Fine-tuning</li>
                            <li className="flex items-center gap-3"><svg className="w-5 h-5 text-[#1A1A1A]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> 99.99% SLA Uptime</li>
                            <li className="flex items-center gap-3"><svg className="w-5 h-5 text-[#1A1A1A]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> 24/7 Priority Support</li>
                        </ul>
                    </div>

                </div>
            </section>

            <PublicFooter />
        </div>
    );
}
