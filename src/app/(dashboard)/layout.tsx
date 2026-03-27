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
        <div style={{ display: "flex", height: "100vh", fontFamily: "'Inter', system-ui, sans-serif", background: "#F8F7FC" }}>
            <SidebarClient role={role} name={name || "User"} links={getLinks()} />

            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0, position: "relative" }}>
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
