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
            case "SuperAdmin": return [
                { name: "Node Provisioning", href: "/superadmin", icon: "overview" },
            ];
            case "Admin": return [
                { name: "Overview", href: "/admin", icon: "overview" },
                { name: "Doctors", href: "/admin/doctors", icon: "doctors" },
                { name: "Receptionists", href: "/admin/receptionists", icon: "receptionists" },
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

    const expiryTs = (session.user as any).subscriptionExpiry ? new Date((session.user as any).subscriptionExpiry).getTime() : 0;
    const isExpiringSoon = role === 'Admin' && expiryTs > 0 && expiryTs - Date.now() < 7 * 24 * 60 * 60 * 1000;
    const daysLeft = isExpiringSoon ? Math.ceil((expiryTs - Date.now()) / (1000 * 60 * 60 * 24)) : 0;

    return (
        <div style={{ display: "flex", height: "100vh", fontFamily: "'Inter', system-ui, sans-serif", background: "#F8F7FC" }}>
            <SidebarClient role={role} name={name || "User"} links={getLinks()} />

            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0, position: "relative" }}>
                {isExpiringSoon && (
                    <div className="bg-red-500/10 border-b border-red-500/20 px-8 py-3 text-red-500 text-sm font-bold flex justify-between items-center backdrop-blur-md relative z-50">
                        <div className="flex items-center gap-3">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                            <span>CRITICAL SYSTEM ALERT: Your Nexis subscription expires {daysLeft > 0 ? `in ${daysLeft} days` : 'today'}. Please rapidly contact system architects or risk node suspension.</span>
                        </div>
                    </div>
                )}
                
                {/* Header */}
                <header style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", padding: "16px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(233,229,245,0.6)", position: "sticky", top: 0, zIndex: 10 }}>
                    <div style={{ paddingLeft: 0 }} className="pl-12 lg:pl-0">
                        <h2 style={{ fontSize: 20, fontWeight: 900, color: "#1E1B3A", letterSpacing: "-0.02em" }}>Workspace</h2>
                        <p style={{ fontSize: 11, color: "#8B85A5", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 2 }}>
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff", border: "1px solid #E9E5F5", padding: "8px 16px", borderRadius: 999, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#7C3AED", display: "inline-block", boxShadow: "0 0 8px rgba(124,58,237,0.5)" }} />
                        <span style={{ fontSize: 11, color: "#6B6585", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em" }}>Online</span>
                    </div>
                </header>

                {/* Content */}
                <main style={{ flex: 1, overflowY: "auto", padding: "32px 40px" }}>
                    <Toaster position="top-right" />
                    {children}
                </main>
            </div>
        </div>
    );
}

