import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import connectToDatabase from "@/lib/mongodb";
import Appointment from "@/lib/models/Appointment";
import Prescription from "@/lib/models/Prescription";
import Patient from "@/lib/models/Patient";
import DoctorAnalyticsClient from "@/components/DoctorAnalytics";

export default async function DoctorDashboard() {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "Doctor") redirect("/");

    await connectToDatabase();
    const doctorId = session.user.id;

    const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(); todayEnd.setHours(23, 59, 59, 999);

    const todayAppointments = await Appointment.countDocuments({ doctorId, date: { $gte: todayStart, $lte: todayEnd } });
    const totalPatients = await Prescription.distinct("patientId", { doctorId }).then(ids => ids.length);
    const totalPrescriptions = await Prescription.countDocuments({ doctorId });

    const upcomingAppointments = await Appointment.find({ doctorId, date: { $gte: todayStart }, status: { $in: ["Pending", "Confirmed"] } })
        .populate("patientId", "name age gender")
        .sort({ date: 1 })
        .limit(5)
        .lean();

    return (
        <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
            <div>
                <h1 className="text-2xl font-black text-[#1E1B3A] tracking-tight">{session.user.name?.startsWith("Dr.") ? session.user.name : `Dr. ${session.user.name}`}&apos;s Dashboard</h1>
                <p className="text-sm font-medium text-[#8B85A5] mt-1">Overview of your clinical activity.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                    { label: "Today's Schedule", value: todayAppointments, icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
                    { label: "My Patients", value: totalPatients, icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
                    { label: "Prescriptions", value: totalPrescriptions, icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
                ].map((stat, i) => (
                    <div key={i} className="stat-card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-black text-[#8B85A5] uppercase tracking-widest">{stat.label}</p>
                                <p className="text-3xl font-black text-[#1E1B3A] mt-2">{stat.value}</p>
                            </div>
                            <div className="icon-wrapper">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} /></svg>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Analytics Chart */}
            <DoctorAnalyticsClient />

            {/* Upcoming Appointments */}
            <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="section-title">Upcoming Appointments</h2>
                    <a href="/doctor/appointments" className="text-sm text-[#7C3AED] font-bold hover:text-[#4C1D95] transition-colors">View All →</a>
                </div>
                {upcomingAppointments.length === 0 ? (
                    <p className="text-sm text-[#8B85A5] font-medium">No upcoming appointments.</p>
                ) : (
                    <div className="space-y-3">
                        {upcomingAppointments.map((apt: any) => (
                            <div key={apt._id} className="flex items-center justify-between p-4 bg-[#FAFAFE] rounded-xl border border-[#F1EFF8] hover:border-[#E9E5F5] transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#4C1D95] flex items-center justify-center text-white font-bold text-sm">
                                        {apt.patientId?.name?.charAt(0) || "?"}
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#1E1B3A] text-sm">{apt.patientId?.name || "Unknown"}</p>
                                        <p className="text-xs text-[#8B85A5]">{apt.patientId?.age}y • {apt.patientId?.gender}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-semibold text-[#1E1B3A]">{new Date(apt.date).toLocaleDateString()}</p>
                                    <p className="text-xs text-[#8B85A5]">{new Date(apt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="/doctor/ai-diagnosis" className="glass-card p-6 group hover:border-[#8B5CF6] transition-all flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#F5F3FF] flex items-center justify-center text-[#7C3AED] group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <div>
                        <h3 className="font-bold text-[#1E1B3A] group-hover:text-[#7C3AED] transition-colors">AI Symptom Checker</h3>
                        <p className="text-xs text-[#8B85A5] font-medium">Get AI-powered diagnostic assistance</p>
                    </div>
                </a>
                <a href="/doctor/prescriptions" className="glass-card p-6 group hover:border-[#8B5CF6] transition-all flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#F5F3FF] flex items-center justify-center text-[#7C3AED] group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <div>
                        <h3 className="font-bold text-[#1E1B3A] group-hover:text-[#7C3AED] transition-colors">Write Prescription</h3>
                        <p className="text-xs text-[#8B85A5] font-medium">Create and manage prescriptions</p>
                    </div>
                </a>
            </div>
        </div>
    );
}

