import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";

export default async function LandingPage() {
    const session = await getServerSession(authOptions);

    if (session?.user) {
        redirect(`/${session.user.role.toLowerCase()}`);
    }

    return (
        <div className="min-h-screen bg-[#FAFAFE] selection:bg-[#7C3AED] selection:text-white font-sans overflow-hidden relative">
            {/* Global Background Grid */}
            <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0 mix-blend-multiply opacity-60"></div>
            
            <PublicNav />

            {/* Ultra Premium Hero Section */}
            <section className="relative pt-40 pb-32 lg:pt-56 lg:pb-40 px-6 z-10 flex flex-col items-center">
                {/* Floating Ambient Orbs */}
                <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] min-w-[300px] bg-[#7C3AED]/20 blur-[120px] rounded-full animate-pulse-slow pointer-events-none"></div>
                <div className="absolute bottom-[0%] right-[10%] w-[25vw] h-[25vw] min-w-[250px] bg-[#10B981]/15 blur-[120px] rounded-full animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }}></div>

                <div className="max-w-6xl mx-auto text-center relative z-10 w-full animate-fade-in">
                    
                    {/* Minimal Monospace Pill */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E9E5F5] text-xs font-mono font-bold text-[#6B6585] mb-12 shadow-sm tracking-widest uppercase">
                        <span className="w-2 h-2 rounded-full bg-[#7C3AED] animate-pulse"></span>
                        Aether Architecture v4.0
                    </div>
                    
                    {/* Hyper-Scale Typography */}
                    <h1 className="text-6xl md:text-[6rem] xl:text-[7.5rem] font-black text-[#1E1B3A] tracking-tighter leading-[0.9] mb-8">
                        Healthcare, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#4C1D95] to-[#1E1B3A]">architected for speed.</span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-[#6B6585] font-medium max-w-3xl mx-auto mb-14 leading-relaxed">
                        A fully integrated, AI-native operating system designed to eliminate friction in modern clinical environments. Code, data, and patient care—unified.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link href="/login" className="glow-border w-full sm:w-auto">
                            <div className="relative z-10 px-10 py-5 bg-[#1E1B3A] text-white rounded-2xl text-lg font-bold hover:bg-black transition-all shadow-[0_0_40px_rgba(124,58,237,0.3)] flex items-center justify-center gap-3">
                                Initialize Workspace
                                <svg className="w-5 h-5 text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </div>
                        </Link>
                        <Link href="/features" className="w-full sm:w-auto px-10 py-5 rounded-2xl font-bold text-[#1E1B3A] bg-white/50 backdrop-blur-md border border-[#E9E5F5] hover:border-[#7C3AED] hover:bg-white transition-all shadow-sm">
                            Read the Documentation
                        </Link>
                    </div>
                </div>
            </section>

            {/* Asymmetrical Bento Grid Ecosystem Section */}
            <section className="py-24 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    
                    <div className="mb-20">
                        <h2 className="text-4xl md:text-5xl font-black text-[#1E1B3A] tracking-tight mb-4">
                            The ecosystem.
                        </h2>
                        <p className="text-xl text-[#6B6585] font-medium">Everything you need to scale perfectly, out of the box.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
                        
                        {/* Bento Item 1: Giant Analytics Card */}
                        <div className="md:col-span-2 glass-card rounded-[2rem] p-8 relative overflow-hidden group hover:border-[#7C3AED]/40 transition-colors">
                            <div className="absolute -inset-1 bg-gradient-to-br from-[#7C3AED]/10 to-transparent blur-xl z-0 pointer-events-none"></div>
                            
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div>
                                    <h3 className="text-2xl font-black text-[#1E1B3A] mb-2">Real-Time Telemetry</h3>
                                    <p className="text-[#6B6585] font-medium max-w-sm">Institutional-grade analytics capturing every micro-interaction across your clinic's patient flow.</p>
                                </div>
                                
                                {/* Abstract UI Render */}
                                <div className="mt-8 flex-1 w-full bg-[#FAFAFE] border border-[#E9E5F5] rounded-xl shadow-inner relative overflow-hidden group-hover:shadow-[inset_0_0_20px_rgba(124,58,237,0.05)] transition-shadow p-6 flex items-end gap-4">
                                    <div className="w-full h-[40%] bg-gradient-to-t from-[#7C3AED] to-[#C4B5FD] rounded-t-sm relative"><div className="absolute top-0 w-full h-px bg-white/50"></div></div>
                                    <div className="w-full h-[70%] bg-gradient-to-t from-[#7C3AED] to-[#C4B5FD] rounded-t-sm relative"><div className="absolute top-0 w-full h-px bg-white/50"></div></div>
                                    <div className="w-full h-[50%] bg-gradient-to-t from-[#7C3AED] to-[#A78BFA] rounded-t-sm relative"><div className="absolute top-0 w-full h-px bg-white/50"></div></div>
                                    <div className="w-full h-[90%] bg-gradient-to-t from-[#4C1D95] to-[#7C3AED] rounded-t-sm relative shadow-[0_0_20px_rgba(124,58,237,0.4)]"><div className="absolute top-0 w-full h-px bg-white"></div><div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-black text-[#4C1D95] bg-white px-2 py-0.5 rounded shadow">+42%</div></div>
                                    <div className="w-full h-[60%] bg-gradient-to-t from-[#7C3AED] to-[#C4B5FD] rounded-t-sm relative"><div className="absolute top-0 w-full h-px bg-white/50"></div></div>
                                </div>
                            </div>
                        </div>

                        {/* Bento Item 2: AI Diagnostic */}
                        <div className="glass-card rounded-[2rem] p-8 relative overflow-hidden bg-[#1E1B3A] border-[#1E1B3A] group group-hover:shadow-2xl">
                            <div className="absolute inset-0 bg-dot-pattern opacity-20 Mix-blend-overlay"></div>
                            
                            <div className="relative z-10 h-full flex flex-col">
                                <h3 className="text-2xl font-black text-white mb-2">Neural Diagnostic Engine</h3>
                                <p className="text-[#8B85A5] font-medium text-sm">State-of-the-art LLMs synthesize differential risks instantly.</p>
                                
                                {/* Fake Terminal Output */}
                                <div className="mt-auto bg-black/40 border border-white/10 rounded-xl p-4 font-mono text-xs text-[#10B981] space-y-2 relative overflow-hidden">
                                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#10B981] to-transparent animate-scan absolute top-0 left-0"></div>
                                    <p className="text-[#6B6585]">&gt; Analyzing symptoms...</p>
                                    <p>&gt; [Matched] Pattern recognition active</p>
                                    <p>&gt; Differential: Bronchitis <span className="text-white">(88% confidence)</span></p>
                                    <p className="animate-pulse">&gt; _</p>
                                </div>
                            </div>
                        </div>

                        {/* Bento Item 3: Prescriptions */}
                        <div className="glass-card rounded-[2rem] p-8 relative overflow-hidden group hover:border-[#10B981]/40 mix-blend-multiply bg-white">
                            <h3 className="text-2xl font-black text-[#1E1B3A] mb-2">Digital Scripts</h3>
                            <p className="text-[#6B6585] font-medium">Zero-latency PDF generation.</p>
                            
                            <div className="mt-6 -mr-12 -mb-12 bg-[#F8F7FC] border border-[#E9E5F5] rounded-tl-2xl p-6 shadow-[-10px_-10px_30px_rgba(0,0,0,0.05)] transform group-hover:-translate-x-2 group-hover:-translate-y-2 transition-transform">
                                <div className="w-3/4 h-4 bg-white rounded mb-3 border border-[#F1EFF8]"></div>
                                <div className="w-1/2 h-4 bg-white rounded mb-6 border border-[#F1EFF8]"></div>
                                <div className="space-y-2">
                                    <div className="w-full h-8 bg-[#ECFDF5] border border-[#10B981]/20 rounded flex items-center px-3 gap-2">
                                        <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                                        <div className="h-2 w-1/3 bg-[#10B981]/40 rounded"></div>
                                    </div>
                                    <div className="w-full h-8 bg-[#ECFDF5] border border-[#10B981]/20 rounded flex items-center px-3 gap-2">
                                        <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                                        <div className="h-2 w-1/2 bg-[#10B981]/40 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bento Item 4: RBAC */}
                        <div className="md:col-span-2 glass-card rounded-[2rem] p-8 relative flex items-center gap-8 group hover:border-[#1E1B3A]/20">
                            <div className="flex-1">
                                <h3 className="text-2xl font-black text-[#1E1B3A] mb-2">Role-Based Architecture</h3>
                                <p className="text-[#6B6585] font-medium mb-6">Strict separation of concerns. Admins manage logic, Doctors diagnose, Receptionists ingest data, Patients view outcomes.</p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-[#F5F3FF] text-[#7C3AED] font-bold text-xs rounded-full border border-[#DDD6FE]">Super Admin</span>
                                    <span className="px-3 py-1 bg-[#EFF6FF] text-[#1D4ED8] font-bold text-xs rounded-full border border-[#BFDBFE]">Doctor Node</span>
                                    <span className="px-3 py-1 bg-[#FFF7ED] text-[#EA580C] font-bold text-xs rounded-full border border-[#FED7AA]">Intake Desk</span>
                                </div>
                            </div>
                            <div className="hidden md:flex relative w-48 h-48 animate-float">
                                <div className="absolute inset-0 border-4 border-[#F5F3FF] rounded-full"></div>
                                <div className="absolute inset-4 border-4 border-dashed border-[#E9E5F5] rounded-full animate-[spin_20s_linear_infinite]"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-[#1E1B3A] rounded-2xl rotate-45 flex items-center justify-center shadow-[0_0_30px_rgba(30,27,58,0.3)]">
                                        <div className="w-6 h-6 bg-white rounded-full -rotate-45"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Monolith CTA */}
            <section className="py-32 px-6 relative">
                <div className="max-w-5xl mx-auto glass-card rounded-[3rem] p-12 md:p-20 text-center bg-[#1E1B3A] border-none shadow-[0_30px_60px_rgba(30,27,58,0.4)] relative overflow-hidden">
                    <div className="absolute inset-0 bg-dot-pattern opacity-10"></div>
                    <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[conic-gradient(from_90deg_at_50%_50%,#1E1B3A_0%,#4C1D95_50%,#1E1B3A_100%)] opacity-30 animate-[spin_10s_linear_infinite] pointer-events-none"></div>
                    
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-8">
                            Ready to compile your practice?
                        </h2>
                        <Link href="/login" className="inline-block px-10 py-5 bg-white text-[#1E1B3A] rounded-2xl text-lg font-black hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                            Initialize Aether Workspace
                        </Link>
                    </div>
                </div>
            </section>

            <PublicFooter />
        </div>
    );
}

