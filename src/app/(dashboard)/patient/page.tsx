import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import connectToDatabase from "@/lib/mongodb";
import Appointment from "@/lib/models/Appointment";
import Prescription from "@/lib/models/Prescription";
import Patient from "@/lib/models/Patient";

export default async function PatientDashboard() {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "Patient") redirect("/");

    await connectToDatabase();

    const patient = await Patient.findOne({ name: session.user.name || "" }).lean();
    const patientId = patient?._id;

    let upcomingAppointments = 0;
    let totalPrescriptions = 0;

    if (patientId) {
        upcomingAppointments = await Appointment.countDocuments({ patientId, status: { $in: ["Pending", "Confirmed"] } });
        totalPrescriptions = await Prescription.countDocuments({ patientId });
    }

    return (
        <div className="space-y-10 animate-fade-in max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-[#1E1B3A] tracking-tight">Your Health Portal</h1>
                    <p className="text-sm font-medium text-[#8B85A5] mt-1">Welcome back, {session.user.name || "User"}.</p>
                </div>
                <div className="flex gap-3">
                    <a href="/patient/ai-explainer" className="btn-secondary">Ask AI</a>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="stat-card">
                    <div className="flex items-center justify-between pointer-events-none">
                        <div>
                            <p className="text-xs font-bold text-[#8B85A5] uppercase tracking-widest">Upcoming Visits</p>
                            <p className="text-3xl font-extrabold text-[#1E1B3A] mt-2">{upcomingAppointments}</p>
                        </div>
                        <div className="icon-wrapper">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="flex items-center justify-between pointer-events-none">
                        <div>
                            <p className="text-xs font-bold text-[#8B85A5] uppercase tracking-widest">Prescriptions</p>
                            <p className="text-3xl font-extrabold text-[#1E1B3A] mt-2">{totalPrescriptions}</p>
                        </div>
                        <div className="icon-wrapper">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        </div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="flex items-center justify-between pointer-events-none">
                        <div>
                            <p className="text-xs font-bold text-[#8B85A5] uppercase tracking-widest">AI Assistance</p>
                            <p className="text-xl font-extrabold text-[#7C3AED] mt-3">Ready</p>
                        </div>
                        <div className="icon-wrapper">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <a href="/patient/appointments" className="glass-card p-8 group hover:border-[#8B5CF6] transition-all cursor-pointer block">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[#F5F3FF] flex items-center justify-center text-[#7C3AED] group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                        <h3 className="font-extrabold text-lg text-[#1E1B3A] group-hover:text-[#7C3AED] transition-colors">My Appointments</h3>
                    </div>
                    <p className="text-sm text-[#8B85A5] font-medium">View your past visits and check details for upcoming appointments.</p>
                </a>

                <a href="/patient/prescriptions" className="glass-card p-8 group hover:border-[#8B5CF6] transition-all cursor-pointer block">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[#F5F3FF] flex items-center justify-center text-[#7C3AED] group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        </div>
                        <h3 className="font-extrabold text-lg text-[#1E1B3A] group-hover:text-[#7C3AED] transition-colors">My Prescriptions</h3>
                    </div>
                    <p className="text-sm text-[#8B85A5] font-medium">Access your digital prescriptions and medical instructions anytime.</p>
                </a>
            </div>

            <div className="glass-card p-8 text-white border-0 shadow-xl relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #7C3AED, #4C1D95)" }}>
                <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                <h2 className="text-2xl font-extrabold mb-3 relative z-10">Complex Prescription?</h2>
                <p className="text-base text-white/80 font-medium mb-8 max-w-2xl relative z-10">
                    Use our AI Explainer to translate complex medical jargon into simple, easy-to-understand language or Urdu.
                </p>
                <a href="/patient/ai-explainer" className="inline-block py-3 px-8 bg-white text-[#7C3AED] font-bold rounded-xl hover:bg-[#F5F3FF] transition-colors relative z-10 shadow-lg">
                    Try AI Explainer
                </a>
            </div>
        </div>
    );
}
