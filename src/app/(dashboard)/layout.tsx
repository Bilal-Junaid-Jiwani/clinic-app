import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";
import SidebarClient from "@/components/SidebarClient";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/login");

    const { role, name } = session.user;

    const getLinks = () => {
        switch (role) {
            case "Admin": return [
                { name: "Overview", href: "/admin", icon: "overview" },
                { name: "Doctors", href: "/admin/doctors", icon: "doctors" },
                { name: "Receptionists", href: "/admin/receptionists", icon: "receptionists" },
                { name: "Plans", href: "/admin/subscriptions", icon: "plans" },
            ];
            case "Doctor": return [
                { name: "Overview", href: "/doctor", icon: "overview" },
                { name: "Appointments", href: "/doctor/appointments", icon: "appointments" },
                { name: "Patients Data", href: "/doctor/patients", icon: "patients" },
                { name: "Prescriptions", href: "/doctor/prescriptions", icon: "prescriptions" },
                { name: "Workspace AI", href: "/doctor/ai-diagnosis", icon: "ai" },
            ];
            case "Receptionist": return [
                { name: "Overview", href: "/receptionist", icon: "overview" },
                { name: "Patient Registry", href: "/receptionist/patients", icon: "patients" },
                { name: "Bookings", href: "/receptionist/appointments", icon: "appointments" },
            ];
            case "Patient": return [
                { name: "Overview", href: "/patient", icon: "overview" },
                { name: "My Visits", href: "/patient/appointments", icon: "appointments" },
                { name: "Medications", href: "/patient/prescriptions", icon: "prescriptions" },
                { name: "Ask AI", href: "/patient/ai-explainer", icon: "ai" },
            ];
            default: return [];
        }
    };

    return (
        <div className="flex h-screen font-sans selection:bg-[#8B5CF6] selection:text-white" style={{ background: "#F8F7FC" }}>
            <SidebarClient role={role} name={name || "User"} links={getLinks()} />

            <div className="flex-1 flex flex-col overflow-hidden min-w-0 relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8B5CF6]/[0.02] rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#A78BFA]/[0.015] rounded-full blur-3xl pointer-events-none" />

                <header className="bg-white/80 backdrop-blur-xl px-6 lg:px-10 py-4 flex items-center justify-between border-b border-[#E9E5F5]/60 z-10 sticky top-0">
                    <div className="pl-12 lg:pl-0">
                        <h2 className="text-xl font-black text-[#1E1B3A] tracking-tight">Workspace</h2>
                        <p className="text-[11px] text-[#8B85A5] font-bold uppercase tracking-widest mt-0.5">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                    <div className="flex items-center gap-3 bg-white border border-[#E9E5F5] px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow">
                        <div className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8B5CF6] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#7C3AED]"></span>
                        </div>
                        <span className="text-[11px] text-[#6B6585] font-extrabold tracking-wider uppercase">Online</span>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-6 lg:p-10 z-0">
                    <Toaster position="top-right" />
                    {children}
                </main>
            </div>
        </div>
    );
}
