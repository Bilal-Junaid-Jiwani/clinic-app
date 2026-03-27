import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";

export default function HowItWorksPage() {
    return (
        <div className="min-h-screen bg-[#FAFAFE] selection:bg-[#1A1A1A] selection:text-white font-sans overflow-x-hidden pt-20">
            <PublicNav />
            
            <header className="py-24 px-6 max-w-4xl mx-auto text-center animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5F3FF] border border-[#E9E5F5] text-sm font-bold text-[#7C3AED] mb-8">
                    Deployment Pipeline
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-[#1A1A1A] tracking-tight leading-[1.1] mb-6">
                    From legacy systems to <br /> AI orchestration.
                </h1>
                <p className="text-xl text-[#6B6585] font-medium max-w-2xl mx-auto leading-relaxed">
                    We designed ClinicAI to be deployed in minutes, not months. Here is how you transition your entire medical pipeline to the future.
                </p>
            </header>

            <section className="py-16 px-6 max-w-5xl mx-auto relative">
                {/* Vertical Line */}
                <div className="absolute left-[2.25rem] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#E9E5F5] to-transparent -translate-x-1/2"></div>
                
                <div className="space-y-24">
                    {/* Step 1 */}
                    <div className="relative flex flex-col md:flex-row items-center gap-12 md:gap-24 group">
                        <div className="absolute left-[2.25rem] md:left-1/2 w-4 h-4 rounded-full bg-white border-4 border-[#7C3AED] -translate-x-1/2 shadow-[0_0_15px_rgba(124,58,237,0.5)] z-10 transition-transform group-hover:scale-150"></div>
                        <div className="w-full md:w-1/2 pl-16 md:pl-0 md:text-right">
                            <h3 className="text-sm font-bold tracking-widest text-[#7C3AED] uppercase mb-2">Phase 01</h3>
                            <h2 className="text-3xl font-black text-[#1A1A1A] mb-4">Initialize Workspace</h2>
                            <p className="text-[#6B6585] font-medium leading-relaxed">
                                Create an Admin account to provision your clinic's digital twin. Instantly invite your doctors and receptionists via secure email drops. Assign role-based access controls (RBAC) to ensure strict data compartmentalization.
                            </p>
                        </div>
                        <div className="w-full md:w-1/2 pl-16 md:pl-0">
                            <div className="glass-card p-6 h-48 border border-[#E9E5F5] flex items-center justify-center relative overflow-hidden group-hover:border-[#7C3AED] transition-colors">
                                <div className="absolute inset-0 bg-[#F5F3FF] opacity-50"></div>
                                <div className="w-full max-w-xs space-y-3 relative z-10">
                                    <div className="h-10 bg-white rounded border border-[#E9E5F5] flex items-center px-4"><div className="w-1/2 h-3 bg-[#E9E5F5] rounded"></div></div>
                                    <div className="h-10 bg-[#7C3AED] rounded flex items-center justify-center"><div className="w-1/3 h-3 bg-white/50 rounded"></div></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative flex flex-col md:flex-row-reverse items-center gap-12 md:gap-24 group">
                        <div className="absolute left-[2.25rem] md:left-1/2 w-4 h-4 rounded-full bg-white border-4 border-[#10B981] -translate-x-1/2 shadow-[0_0_15px_rgba(16,185,129,0.5)] z-10 transition-transform group-hover:scale-150"></div>
                        <div className="w-full md:w-1/2 pl-16 md:pl-0">
                            <h3 className="text-sm font-bold tracking-widest text-[#10B981] uppercase mb-2">Phase 02</h3>
                            <h2 className="text-3xl font-black text-[#1A1A1A] mb-4">Patient & Booking Injection</h2>
                            <p className="text-[#6B6585] font-medium leading-relaxed">
                                Receptionists utilize the high-speed intake portal to log walk-ins and schedule future appointments. The calendar syncs in real-time across the entire facility, preventing double-bookings.
                            </p>
                        </div>
                        <div className="w-full md:w-1/2 pl-16 md:pl-0 md:text-right">
                            <div className="glass-card p-6 h-48 border border-[#E9E5F5] flex items-center justify-center relative overflow-hidden group-hover:border-[#10B981] transition-colors">
                                <div className="absolute inset-0 bg-[#ECFDF5] opacity-50"></div>
                                <div className="grid grid-cols-3 gap-2 w-full max-w-xs relative z-10">
                                    <div className="h-24 bg-white border border-[#E9E5F5] rounded"></div>
                                    <div className="h-24 bg-[#10B981] rounded shadow-lg translate-y-2"></div>
                                    <div className="h-24 bg-white border border-[#E9E5F5] rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative flex flex-col md:flex-row items-center gap-12 md:gap-24 group">
                        <div className="absolute left-[2.25rem] md:left-1/2 w-4 h-4 rounded-full bg-white border-4 border-[#F97316] -translate-x-1/2 shadow-[0_0_15px_rgba(249,115,22,0.5)] z-10 transition-transform group-hover:scale-150"></div>
                        <div className="w-full md:w-1/2 pl-16 md:pl-0 md:text-right">
                            <h3 className="text-sm font-bold tracking-widest text-[#F97316] uppercase mb-2">Phase 03</h3>
                            <h2 className="text-3xl font-black text-[#1A1A1A] mb-4">AI Diagnostic Analysis</h2>
                            <p className="text-[#6B6585] font-medium leading-relaxed">
                                Doctors review the intake data and utilize the AI Symptom Checker during consultations. The engine processes natural language inputs to flag risks, suggesting targeted treatments which are immediately compiled into digital PDFs.
                            </p>
                        </div>
                        <div className="w-full md:w-1/2 pl-16 md:pl-0">
                            <div className="glass-card p-6 h-48 border border-[#E9E5F5] flex items-center justify-center relative overflow-hidden group-hover:border-[#F97316] transition-colors">
                                <div className="absolute inset-0 bg-[#FFF7ED] opacity-50"></div>
                                <div className="w-full max-w-xs bg-white border border-[#E9E5F5] rounded shadow-sm p-4 relative z-10 space-y-2">
                                    <div className="flex gap-2">
                                        <div className="w-6 h-6 rounded-full bg-[#F97316]/20"></div>
                                        <div className="h-6 flex-1 bg-[#F97316]/10 rounded"></div>
                                    </div>
                                    <div className="h-20 w-full bg-[#FAFAFE] border border-[#F1EFF8] rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 text-center max-w-4xl mx-auto">
                <h2 className="text-4xl font-black text-[#1A1A1A] mb-8">Deploy your workspace today.</h2>
                <a href="/login" className="px-8 py-4 bg-[#7C3AED] text-white rounded-xl text-lg font-bold hover:bg-[#6D28D9] transition-all shadow-xl hover:-translate-y-1 inline-block shadow-[#7C3AED]/30">
                    Get Started Free
                </a>
            </section>

            <PublicFooter />
        </div>
    );
}
