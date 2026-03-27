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
        <div className="min-h-screen bg-[#FAFAFE] selection:bg-[#7C3AED] selection:text-white font-sans overflow-x-hidden">
            <PublicNav />

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 overflow-hidden px-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-[#7C3AED]/10 to-transparent blur-[100px] -z-10 rounded-full pointer-events-none" />
                
                <div className="max-w-5xl mx-auto text-center relative z-10 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5F3FF] border border-[#E9E5F5] text-sm font-bold text-[#7C3AED] mb-8 shadow-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7C3AED] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7C3AED]"></span>
                        </span>
                        ClinicAI 2.0 is now live
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-[#1E1B3A] tracking-tight leading-[1.1] mb-8">
                        The future of clinic<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#4C1D95]">management is here.</span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-[#6B6585] font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
                        Transform your medical practice with AI-powered diagnosis, instant digital prescriptions, and smart booking analytics. Designed for modern clinics.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/login" className="btn-primary text-lg w-full sm:w-auto px-8 py-4 shadow-xl shadow-[#7C3AED]/25 hover:shadow-[#7C3AED]/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                            Start Your Free Trial
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </Link>
                        <a href="#features" className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-[#1E1B3A] bg-white border-2 border-[#E9E5F5] hover:border-[#7C3AED] hover:text-[#7C3AED] transition-all flex items-center justify-center gap-2">
                            Explore Features
                        </a>
                    </div>
                    
                    <p className="text-sm font-medium text-[#8B85A5] mt-6">
                        No credit card required • 14-day free trial • Cancel anytime
                    </p>
                </div>
                
                {/* Hero Dashboard Preview Image/Mock */}
                <div className="max-w-6xl mx-auto mt-20 relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFE] via-transparent to-transparent z-10"></div>
                    <div className="glass-card p-2 rounded-2xl md:rounded-[2rem] border border-[#E9E5F5] shadow-2xl bg-white/50 relative overflow-hidden">
                         <div className="absolute top-0 left-0 w-full h-12 bg-[#F8F7FC] border-b border-[#E9E5F5] flex items-center px-6 gap-2">
                             <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                             <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                             <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                         </div>
                         <div className="mt-12 bg-white rounded-xl overflow-hidden aspect-video relative flex items-center justify-center border border-[#F1EFF8]">
                             {/* Abstract UI Representation */}
                             <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#7C3AED 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                             <div className="grid grid-cols-4 gap-6 p-8 w-full h-full relative z-10">
                                 <div className="col-span-1 border-r border-[#F1EFF8] pr-6 space-y-4">
                                     <div className="h-8 w-3/4 rounded-lg bg-[#F5F3FF]"></div>
                                     <div className="h-4 w-1/2 rounded bg-[#F1EFF8]"></div>
                                     <div className="h-4 w-2/3 rounded bg-[#F1EFF8]"></div>
                                     <div className="h-4 w-1/2 rounded bg-[#F1EFF8]"></div>
                                 </div>
                                 <div className="col-span-3 space-y-6">
                                     <div className="h-12 w-1/3 rounded-xl bg-gradient-to-r from-[#F5F3FF] to-transparent"></div>
                                     <div className="grid grid-cols-3 gap-4">
                                         <div className="h-24 rounded-xl bg-white border border-[#E9E5F5] shadow-sm"></div>
                                         <div className="h-24 rounded-xl bg-white border border-[#E9E5F5] shadow-sm"></div>
                                         <div className="h-24 rounded-xl bg-white border border-[#E9E5F5] shadow-sm"></div>
                                     </div>
                                     <div className="h-48 rounded-xl bg-[#F8F7FC] border border-[#F1EFF8]"></div>
                                 </div>
                             </div>
                         </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-white px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-[#1E1B3A] tracking-tight mb-4">
                            Everything you need to run a modern clinic
                        </h2>
                        <p className="text-[#6B6585] font-medium text-lg max-w-2xl mx-auto">
                            Replace messy paperwork and disconnected systems with one unified, intelligent platform.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="glass-card p-8 group hover:-translate-y-1 transition-transform">
                            <div className="w-14 h-14 rounded-2xl bg-[#F5F3FF] flex items-center justify-center text-[#7C3AED] mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-[#1E1B3A] mb-3">AI Symptom Checker</h3>
                            <p className="text-[#6B6585] text-sm leading-relaxed font-medium">
                                Get instant second opinions from our trained AI model. Generate differential diagnoses based on patient history and current symptoms.
                            </p>
                        </div>
                        {/* Feature 2 */}
                        <div className="glass-card p-8 group hover:-translate-y-1 transition-transform">
                            <div className="w-14 h-14 rounded-2xl bg-[#F5F3FF] flex items-center justify-center text-[#7C3AED] mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-[#1E1B3A] mb-3">Digital Prescriptions</h3>
                            <p className="text-[#6B6585] text-sm leading-relaxed font-medium">
                                Write, save, and instantly generate beautifully formatted PDF prescriptions. Patients can digitally access them anytime.
                            </p>
                        </div>
                        {/* Feature 3 */}
                        <div className="glass-card p-8 group hover:-translate-y-1 transition-transform">
                            <div className="w-14 h-14 rounded-2xl bg-[#F5F3FF] flex items-center justify-center text-[#7C3AED] mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-[#1E1B3A] mb-3">Smart Scheduling</h3>
                            <p className="text-[#6B6585] text-sm leading-relaxed font-medium">
                                Powerful booking engine for your receptionists. Track patient flow, minimize no-shows, and manage wait times effortlessly.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #7C3AED, #0F0B2E)" }}>
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#4C1D95]/40 blur-[100px] rounded-full pointer-events-none" />
                
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
                        Ready to upgrade your clinic?
                    </h2>
                    <p className="text-white/80 font-medium text-lg mb-10 max-w-2xl mx-auto">
                        Join hundreds of medical professionals using ClinicAI to save time and deliver better patient care.
                    </p>
                    <Link href="/login" className="inline-flex items-center justify-center px-8 py-4 text-lg font-black bg-white text-[#7C3AED] rounded-xl hover:bg-[#F5F3FF] hover:scale-105 transition-all shadow-2xl">
                        Create Your Clinic Workspace
                    </Link>
                </div>
            </section>

            <PublicFooter />
        </div>
    );
}
