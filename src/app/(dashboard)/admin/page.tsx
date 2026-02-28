import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import connectToDatabase from "@/lib/mongodb";
import User from "@/lib/models/User";
import Patient from "@/lib/models/Patient";
import Appointment from "@/lib/models/Appointment";

// Helper for SVGs
const SvgIcon = ({ path }: { path: string }) => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={path} />
    </svg>
);

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "Admin") redirect("/");

    await connectToDatabase();

    const totalDoctors = await User.countDocuments({ role: "Doctor" });
    const totalPatients = await Patient.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    const revenue = (totalAppointments * 150 + totalPatients * 50).toLocaleString();

    const stats = [
        { label: "Active Doctors", value: totalDoctors, icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
        { label: "Registered Patients", value: totalPatients, icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
        { label: "Total Bookings", value: totalAppointments, icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
        { label: "Monthly Revenue", value: `$${revenue}`, icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
    ];

    return (
        <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">Organization Overview</h1>
                    <p className="text-sm font-medium text-gray-500 mt-1">High-level metrics for ClinicAI.</p>
                </div>
                <div className="hidden sm:block">
                    {/* Fixed Button styling */}
                    <button className="btn-primary">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        Download Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="stat-card group">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                                <p className="text-3xl font-black text-gray-900 mt-2">{stat.value}</p>
                            </div>
                            <div className="icon-wrapper group-hover:scale-110 transition-transform duration-300">
                                <SvgIcon path={stat.icon} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 glass-card p-8">
                    <h2 className="section-title mb-6">Operations & Management</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <a href="/admin/doctors" className="group flex items-center justify-between p-5 rounded-xl border border-gray-200 bg-white hover:border-[#14b8a6] transition-all shadow-sm hover:shadow-md cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[#f0fdfa] flex items-center justify-center text-[#0d9488]">
                                    <SvgIcon path="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 group-hover:text-[#0d9488] transition-colors">Medical Staff</h3>
                                    <p className="text-xs text-gray-500 font-medium">Manage doctor profiles</p>
                                </div>
                            </div>
                            <svg className="w-5 h-5 text-gray-300 group-hover:text-[#0d9488] group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        </a>
                        <a href="/admin/receptionists" className="group flex items-center justify-between p-5 rounded-xl border border-gray-200 bg-white hover:border-[#14b8a6] transition-all shadow-sm hover:shadow-md cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[#f0fdfa] flex items-center justify-center text-[#0d9488]">
                                    <SvgIcon path="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 group-hover:text-[#0d9488] transition-colors">Front Desk</h3>
                                    <p className="text-xs text-gray-500 font-medium">Manage receptionists</p>
                                </div>
                            </div>
                            <svg className="w-5 h-5 text-gray-300 group-hover:text-[#0d9488] group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        </a>
                    </div>
                </div>

                {/* Fixed the invisible text bug and removed emoji here */}
                <div className="glass-card !bg-gradient-to-br !from-[#0d9488] !to-[#0a1628] p-8 border-0 shadow-xl relative overflow-hidden text-white flex flex-col justify-between min-h-[260px]">
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-lg font-black uppercase text-white/70 tracking-widest">Current Plan</h2>
                            <svg className="w-6 h-6 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <div className="text-5xl font-black tracking-tighter text-white">PRO</div>
                        <p className="text-sm font-semibold text-[#99f6e4] mt-2">Unlimited Clinic Access</p>
                    </div>

                    <a href="/admin/subscriptions" className="relative z-10 block text-center w-full py-3 bg-white text-[#0d9488] font-extrabold text-sm rounded-xl hover:bg-gray-50 transition-colors shadow-lg">
                        View Plan Details
                    </a>
                </div>
            </div>
        </div>
    );
}
