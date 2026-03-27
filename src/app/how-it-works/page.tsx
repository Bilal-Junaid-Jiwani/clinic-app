import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";

export default function HowItWorksPage() {
    return (
        <div className="min-h-screen bg-[#0F0B2E] selection:bg-[#7C3AED] selection:text-white font-sans overflow-x-hidden pt-20 relative">
            <div className="absolute inset-0 bg-grid-dark pointer-events-none z-0 opacity-20"></div>
            <div className="absolute top-[20%] left-0 w-[50vw] h-[50vw] bg-[#10B981]/10 blur-[150px] rounded-full pointer-events-none"></div>

            <PublicNav />
            
            <header className="py-24 px-6 max-w-4xl mx-auto text-center relative z-10 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-bold text-[#E9E5F5] mb-8 shadow-sm tracking-widest uppercase backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-[#FFBD2E] animate-pulse"></span>
                    Deployment Pipeline
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-6">
                    From legacy systems to <br /> 
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFBD2E] to-[#F59E0B]">AI orchestration.</span>
                </h1>
                <p className="text-xl text-[#A9A3C2] font-medium max-w-2xl mx-auto leading-relaxed">
                    We designed Nexis to be deployed in minutes, not months. Here is how you transition your entire medical pipeline to the future.
                </p>
            </header>

            <section className="py-16 px-6 max-w-5xl mx-auto relative z-10">
                {/* Vertical Line */}
                <div className="absolute left-[2.25rem] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#7C3AED]/30 to-transparent -translate-x-1/2"></div>
                
                <div className="space-y-32">
                    {/* Step 1 */}
                    <div className="relative flex flex-col md:flex-row items-center gap-12 md:gap-24 group">
                        <div className="absolute left-[2.25rem] md:left-1/2 w-8 h-8 rounded-full bg-[#1A1145] border-4 border-[#7C3AED] -translate-x-1/2 shadow-[0_0_20px_rgba(124,58,237,0.8)] z-10 transition-transform duration-500 group-hover:scale-125 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                        </div>
                        <div className="w-full md:w-1/2 pl-16 md:pl-0 md:text-right">
                            <h3 className="text-xs font-mono font-bold tracking-widest text-[#7C3AED] uppercase mb-3">Phase 01</h3>
                            <h2 className="text-3xl font-black text-white mb-4">Initialize Workspace</h2>
                            <p className="text-[#A9A3C2] font-medium leading-relaxed">
                                Create an Admin account to provision your clinic's digital twin. Instantly invite your doctors and receptionists via secure email drops. Assign role-based access controls (RBAC) to ensure strict data compartmentalization.
                            </p>
                        </div>
                        <div className="w-full md:w-1/2 pl-16 md:pl-0">
                            <div className="bg-[#1A1145] p-6 h-64 border border-white/10 rounded-2xl flex items-center justify-center relative overflow-hidden group-hover:border-[#7C3AED]/50 transition-colors shadow-2xl animate-float">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/10 to-transparent opacity-50"></div>
                                <div className="w-full max-w-xs space-y-4 relative z-10">
                                    <div className="h-12 bg-[#0F0B2E] rounded-xl border border-white/5 flex items-center px-4 shadow-inner"><div className="w-1/2 h-2 bg-white/20 rounded"></div></div>
                                    <div className="h-12 bg-[#0F0B2E] rounded-xl border border-white/5 flex items-center px-4 shadow-inner"><div className="w-2/3 h-2 bg-white/20 rounded"></div></div>
                                    <div className="h-12 bg-gradient-to-r from-[#7C3AED] to-[#4C1D95] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.4)]"><div className="w-1/3 h-2 bg-white/80 rounded"></div></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative flex flex-col md:flex-row-reverse items-center gap-12 md:gap-24 group">
                        <div className="absolute left-[2.25rem] md:left-1/2 w-8 h-8 rounded-full bg-[#1A1145] border-4 border-[#10B981] -translate-x-1/2 shadow-[0_0_20px_rgba(16,185,129,0.8)] z-10 transition-transform duration-500 group-hover:scale-125 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                        </div>
                        <div className="w-full md:w-1/2 pl-16 md:pl-0">
                            <h3 className="text-xs font-mono font-bold tracking-widest text-[#10B981] uppercase mb-3">Phase 02</h3>
                            <h2 className="text-3xl font-black text-white mb-4">Patient & Booking Injection</h2>
                            <p className="text-[#A9A3C2] font-medium leading-relaxed">
                                Receptionists utilize the high-speed intake portal to log walk-ins and schedule future appointments. The calendar syncs in real-time across the entire facility, preventing double-bookings and scheduling conflicts.
                            </p>
                        </div>
                        <div className="w-full md:w-1/2 pl-16 md:pl-0 md:text-right">
                            <div className="bg-[#1A1145] p-6 h-64 border border-white/10 rounded-2xl flex items-center justify-center relative overflow-hidden group-hover:border-[#10B981]/50 transition-colors shadow-2xl animate-float-delayed">
                                <div className="absolute inset-0 bg-gradient-to-bl from-[#10B981]/10 to-transparent opacity-50"></div>
                                <div className="grid grid-cols-3 gap-3 w-full max-w-xs relative z-10">
                                    <div className="h-32 bg-[#0F0B2E] border border-white/5 rounded-xl"></div>
                                    <div className="h-32 bg-gradient-to-b from-[#10B981] to-[#059669] rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] translate-y-4"></div>
                                    <div className="h-32 bg-[#0F0B2E] border border-white/5 rounded-xl"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative flex flex-col md:flex-row items-center gap-12 md:gap-24 group">
                        <div className="absolute left-[2.25rem] md:left-1/2 w-8 h-8 rounded-full bg-[#1A1145] border-4 border-[#FFBD2E] -translate-x-1/2 shadow-[0_0_20px_rgba(255,189,46,0.8)] z-10 transition-transform duration-500 group-hover:scale-125 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                        </div>
                        <div className="w-full md:w-1/2 pl-16 md:pl-0 md:text-right">
                            <h3 className="text-xs font-mono font-bold tracking-widest text-[#FFBD2E] uppercase mb-3">Phase 03</h3>
                            <h2 className="text-3xl font-black text-white mb-4">AI Diagnostic Analysis</h2>
                            <p className="text-[#A9A3C2] font-medium leading-relaxed">
                                Doctors review the intake data and utilize the AI Symptom Checker during consultations. The engine processes natural language inputs to flag risks, suggesting targeted treatments which are immediately compiled into digital PDFs.
                            </p>
                        </div>
                        <div className="w-full md:w-1/2 pl-16 md:pl-0">
                            <div className="bg-[#1A1145] p-6 h-64 border border-white/10 rounded-2xl flex items-center justify-center relative overflow-hidden group-hover:border-[#FFBD2E]/50 transition-colors shadow-2xl animate-float">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#FFBD2E]/10 to-transparent opacity-50"></div>
                                <div className="w-full max-w-xs bg-[#0F0B2E] border border-white/5 rounded-xl shadow-inner p-5 relative z-10 space-y-4">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFBD2E] to-[#F59E0B] shadow-[0_0_10px_rgba(255,189,46,0.3)]"></div>
                                        <div className="h-2 flex-1 bg-white/10 rounded"></div>
                                    </div>
                                    <div className="h-24 w-full bg-white/5 border border-white/5 rounded-lg flex flex-col justify-end p-2 gap-2">
                                        <div className="w-full h-1 bg-white/20 rounded"></div>
                                        <div className="w-full h-1 bg-white/20 rounded"></div>
                                        <div className="w-2/3 h-1 bg-[#10B981]/80 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-32 px-6 text-center max-w-4xl mx-auto relative z-10">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">Deploy your workspace today.</h2>
                <a href="/login" className="glow-border inline-block">
                    <div className="px-10 py-5 bg-white text-[#1E1B3A] rounded-2xl text-lg font-black hover:bg-[#F5F3FF] transition-colors relative z-10 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                        Get Started Free
                    </div>
                </a>
            </section>

            <PublicFooter />
        </div>
    );
}

