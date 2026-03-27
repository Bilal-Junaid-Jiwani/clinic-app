import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import connectToDatabase from "@/lib/mongodb";
import Patient from "@/lib/models/Patient";
import Appointment from "@/lib/models/Appointment";

// Helper for SVGs
const SvgIcon = ({ path }: { path: string }) => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={path} />
    </svg>
);

export default async function ReceptionistDashboard() {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "Receptionist") redirect("/");

    await connectToDatabase();
    const totalPatients = await Patient.countDocuments();
    const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(); todayEnd.setHours(23, 59, 59, 999);
    const todayAppointments = await Appointment.countDocuments({ date: { $gte: todayStart, $lte: todayEnd } });
    const pendingAppointments = await Appointment.countDocuments({ status: "Pending" });

    return (
        <div className="space-y-10 animate-fade-in max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-[#1E1B3A] tracking-tight">Front Desk Dashboard</h1>
                    <p className="text-sm font-medium text-[#8B85A5] mt-1">Hello {session.user.name || "User"}, manage clinic flow from here.</p>
                </div>
                <div className="flex gap-3">
                    <a href="/receptionist/patients" className="btn-secondary">New Patient</a>
                    <a href="/receptionist/appointments" className="btn-primary">+ Book Visit</a>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="stat-card">
                    <div className="flex items-center justify-between pointer-events-none">
                        <div>
                            <p className="text-xs font-bold text-[#8B85A5] uppercase tracking-widest">Total Registry</p>
                            <p className="text-3xl font-extrabold text-[#1E1B3A] mt-2">{totalPatients}</p>
                        </div>
                        <div className="icon-wrapper"><SvgIcon path="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="flex items-center justify-between pointer-events-none">
                        <div>
                            <p className="text-xs font-bold text-[#8B85A5] uppercase tracking-widest">Today&apos;s Flow</p>
                            <p className="text-3xl font-extrabold text-[#1E1B3A] mt-2">{todayAppointments}</p>
                        </div>
                        <div className="icon-wrapper"><SvgIcon path="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="flex items-center justify-between pointer-events-none">
                        <div>
                            <p className="text-xs font-bold text-[#8B85A5] uppercase tracking-widest">Awaiting Confirm</p>
                            <p className="text-3xl font-extrabold text-[#1E1B3A] mt-2">{pendingAppointments}</p>
                        </div>
                        <div className="icon-wrapper"><SvgIcon path="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <a href="/receptionist/patients" className="glass-card p-8 group hover:border-[#8B5CF6] transition-all cursor-pointer">
                    <div className="w-14 h-14 rounded-2xl bg-[#F5F3FF] flex items-center justify-center text-[#7C3AED] text-2xl mb-6 group-hover:scale-110 transition-transform"><SvgIcon path="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></div>
                    <h3 className="font-extrabold text-lg text-[#1E1B3A] mb-2">Patient Directory</h3>
                    <p className="text-sm text-[#8B85A5] font-medium">Search, register or update patient profiles across the clinic.</p>
                </a>
                <a href="/receptionist/appointments" className="glass-card p-8 group hover:border-[#8B5CF6] transition-all cursor-pointer">
                    <div className="w-14 h-14 rounded-2xl bg-[#F5F3FF] flex items-center justify-center text-[#7C3AED] text-2xl mb-6 group-hover:scale-110 transition-transform"><SvgIcon path="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></div>
                    <h3 className="font-extrabold text-lg text-[#1E1B3A] mb-2">Appointment Hub</h3>
                    <p className="text-sm text-[#8B85A5] font-medium">Schedule new visits, confirm arrivals, or cancel bookings.</p>
                </a>
            </div>
        </div>
    );
}

