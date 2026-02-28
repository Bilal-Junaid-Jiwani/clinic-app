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
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Your Health Portal</h1>
                    <p className="text-sm font-medium text-gray-500 mt-1">Welcome back, {session.user.name || "User"}.</p>
                </div>
                <div className="flex gap-3">
                    <a href="/patient/ai-explainer" className="btn-secondary">Ask AI</a>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="stat-card">
                    <div className="flex items-center justify-between pointer-events-none">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Upcoming Visits</p>
                            <p className="text-3xl font-extrabold text-[#0f172a] mt-2">{upcomingAppointments}</p>
                        </div>
                        <div className="icon-wrapper">📅</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="flex items-center justify-between pointer-events-none">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Prescriptions</p>
                            <p className="text-3xl font-extrabold text-[#0f172a] mt-2">{totalPrescriptions}</p>
                        </div>
                        <div className="icon-wrapper">💊</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="flex items-center justify-between pointer-events-none">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">AI Assistance</p>
                            <p className="text-xl font-extrabold text-[#0d9488] mt-3">Ready ✨</p>
                        </div>
                        <div className="icon-wrapper">🧠</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <a href="/patient/appointments" className="glass-card p-8 group hover:border-[#14b8a6] transition-all cursor-pointer block">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[#f0fdfa] flex items-center justify-center text-[#0d9488] text-xl group-hover:scale-110 transition-transform">📅</div>
                        <h3 className="font-extrabold text-lg text-gray-900 group-hover:text-[#0d9488] transition-colors">My Appointments</h3>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">View your past visits and check details for upcoming appointments.</p>
                </a>

                <a href="/patient/prescriptions" className="glass-card p-8 group hover:border-[#14b8a6] transition-all cursor-pointer block">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[#f0fdfa] flex items-center justify-center text-[#0d9488] text-xl group-hover:scale-110 transition-transform">💊</div>
                        <h3 className="font-extrabold text-lg text-gray-900 group-hover:text-[#4f46e5] transition-colors">My Prescriptions</h3>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">Access your digital prescriptions and medical instructions anytime.</p>
                </a>
            </div>

            <div className="glass-card p-8 bg-gradient-to-br from-[#4f46e5] to-[#312e81] text-white border-0 shadow-xl relative overflow-hidden">
                <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                <h2 className="text-2xl font-extrabold mb-3 relative z-10">Complex Prescription?</h2>
                <p className="text-base text-white/80 font-medium mb-8 max-w-2xl relative z-10">
                    Use our AI Explainer to translate complex medical jargon into simple, easy-to-understand language or Urdu.
                </p>
                <a href="/patient/ai-explainer" className="inline-block py-3 px-8 bg-white text-[#4f46e5] font-bold rounded-xl hover:bg-[#eef2ff] transition-colors relative z-10 shadow-lg">
                    Try AI Explainer ✨
                </a>
            </div>
        </div>
    );
}
