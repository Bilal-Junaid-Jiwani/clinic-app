import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import connectToDatabase from "@/lib/mongodb";
import Appointment from "@/lib/models/Appointment";
import Prescription from "@/lib/models/Prescription";
import { SymptomChecker } from "@/components/SymptomChecker";
import { PrescriptionGenerator } from "@/components/PrescriptionGenerator";

// Helper for SVGs
const SvgIcon = ({ path }: { path: string }) => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={path} />
    </svg>
);

export default async function DoctorDashboard() {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "Doctor") redirect("/");

    await connectToDatabase();
    const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(); todayEnd.setHours(23, 59, 59, 999);

    const todayAppointments = await Appointment.find({
        doctorId: session.user.id,
        date: { $gte: todayStart, $lte: todayEnd }
    }).populate("patientId").lean();

    const totalAppointments = await Appointment.countDocuments({ doctorId: session.user.id });
    const totalPrescriptions = await Prescription.countDocuments({ doctorId: session.user.id });

    return (
        <div className="space-y-10 animate-fade-in max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Good day, Dr. {(session.user.name || "Doctor").split(' ')[0]} 👋</h1>
                    <p className="text-sm font-medium text-gray-500 mt-1">Here is what&apos;s happening in your clinic today.</p>
                </div>
                <div className="flex gap-3">
                    <a href="/doctor/ai-diagnosis" className="btn-secondary">Ask AI</a>
                    <a href="/doctor/appointments" className="btn-primary">View Schedule</a>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="stat-card">
                    <div className="flex items-center justify-between pointer-events-none">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Today&apos;s Patients</p>
                            <p className="text-3xl font-extrabold text-[#0f172a] mt-2">{todayAppointments.length}</p>
                        </div>
                        <div className="icon-wrapper"><SvgIcon path="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="flex items-center justify-between pointer-events-none">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Consults</p>
                            <p className="text-3xl font-extrabold text-[#0f172a] mt-2">{totalAppointments}</p>
                        </div>
                        <div className="icon-wrapper"><SvgIcon path="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="flex items-center justify-between pointer-events-none">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Prescriptions</p>
                            <p className="text-3xl font-extrabold text-[#0f172a] mt-2">{totalPrescriptions}</p>
                        </div>
                        <div className="icon-wrapper"><SvgIcon path="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Today's Schedule */}
                <div className="lg:col-span-2 glass-card p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="section-title">Today&apos;s Schedule</h2>
                        <span className="badge badge-brand">{todayAppointments.length} Appointments</span>
                    </div>

                    {todayAppointments.length === 0 ? (
                        <div className="text-center py-10 border-2 border-dashed border-gray-100 rounded-2xl">
                            <div className="flex justify-center mb-3 text-gray-300"><SvgIcon path="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></div>
                            <p className="text-gray-500 font-medium text-sm">No more appointments today. Enjoy your break!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {todayAppointments.map((a: any) => (
                                <div key={a._id} className="group flex items-center justify-between p-4 rounded-2xl border border-gray-100 bg-white hover:border-[#14b8a6] hover:shadow-md transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0d9488] to-[#0f766e] flex items-center justify-center text-white font-bold text-lg shadow-sm">
                                            {a.patientId?.name?.charAt(0) || "?"}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 group-hover:text-[#0d9488] transition-colors">{a.patientId?.name || "Unknown Patient"}</p>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                <p className="text-xs text-gray-500 font-medium">{new Date(a.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <span className={`badge ${a.status === "Completed" ? "badge-semantic-green" :
                                        a.status === "Confirmed" ? "badge-brand" : "badge-semantic-amber"
                                        }`}>{a.status}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Quick Tools */}
                <div className="space-y-6">
                    <div className="glass-card p-6 bg-gradient-to-br from-[#4f46e5] to-[#312e81] text-white border-0 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                        <h3 className="font-extrabold text-lg mb-2 relative z-10">AI Diagnostic Assistant</h3>
                        <p className="text-white/70 text-sm font-medium mb-6 relative z-10 leading-relaxed">
                            Analyze symptoms against thousands of medical records instantly.
                        </p>
                        <a href="/doctor/ai-diagnosis" className="block text-center w-full py-2.5 bg-white text-[#4f46e5] font-bold rounded-xl hover:bg-[#eef2ff] transition-colors relative z-10">
                            Open Assistant ✨
                        </a>
                    </div>
                </div>
            </div>

            {/* In-page Tools */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-card p-8"><PrescriptionGenerator /></div>
            </div>
        </div>
    );
}
