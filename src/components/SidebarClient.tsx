"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface SidebarClientProps {
    role: string;
    name: string;
    links: { name: string; href: string; icon: string }[];
}

const iconPaths: Record<string, string> = {
    overview: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
    doctors: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
    receptionists: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    plans: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    appointments: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    patients: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
    ai: "M13 10V3L4 14h7v7l9-11h-7z",
    prescriptions: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
};

export default function SidebarClient({ role, name, links }: SidebarClientProps) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <>
            {/* Mobile menu button */}
            <button
                onClick={() => setOpen(true)}
                style={{ background: "#0F0B2E", border: "1px solid rgba(255,255,255,0.1)" }}
                className="lg:hidden fixed top-4 left-4 z-40 p-2.5 rounded-xl text-white shadow-xl"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>

            {/* Mobile overlay */}
            {open && <div className="sidebar-overlay lg:hidden" onClick={() => setOpen(false)} />}

            {/* Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
                style={{ width: 260, background: "linear-gradient(180deg, #0F0B2E 0%, #1A1145 100%)" }}
            >
                {/* Accent line */}
                <div style={{ height: 2, background: "linear-gradient(90deg, transparent 5%, #8B5CF6 30%, #A78BFA 50%, #8B5CF6 70%, transparent 95%)" }} />

                {/* Logo */}
                <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div
                            className="flex items-center justify-center"
                            style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg, #8B5CF6, #7C3AED)", boxShadow: "0 0 20px rgba(139,92,246,0.4)" }}
                        >
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <div>
                            <h1 style={{ fontSize: 18, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1 }}>
                                Clinic<span style={{ color: "#A78BFA" }}>AI</span>
                            </h1>
                            <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(167,139,250,0.6)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{role}</span>
                        </div>
                    </div>
                    <button onClick={() => setOpen(false)} className="lg:hidden" style={{ color: "#94a3b8", padding: 4 }}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Nav Links */}
                <nav style={{ flex: 1, padding: "24px 12px", overflow: "auto" }}>
                    <p style={{ padding: "0 12px", fontSize: 10, fontWeight: 900, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16 }}>Menu</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        {links.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 12,
                                        padding: "12px 14px",
                                        borderRadius: 12,
                                        fontSize: 14,
                                        fontWeight: 600,
                                        transition: "all 0.2s",
                                        color: isActive ? "#C4B5FD" : "#94a3b8",
                                        background: isActive ? "rgba(139,92,246,0.12)" : "transparent",
                                        border: isActive ? "1px solid rgba(139,92,246,0.2)" : "1px solid transparent",
                                        position: "relative",
                                        textDecoration: "none",
                                    }}
                                >
                                    {isActive && (
                                        <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", height: 24, width: 3, background: "#8B5CF6", borderRadius: "0 4px 4px 0" }} />
                                    )}
                                    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: isActive ? "#A78BFA" : "inherit" }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPaths[link.icon] || iconPaths["overview"]} />
                                    </svg>
                                    <span>{link.name}</span>
                                    {isActive && <div style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "#8B5CF6" }} />}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* User profile */}
                <div style={{ padding: 12, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <div
                            className="flex items-center justify-center"
                            style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #8B5CF6, #7C3AED)", color: "#fff", fontWeight: 900, fontSize: 14, boxShadow: "0 0 14px rgba(139,92,246,0.35)" }}
                        >
                            {name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: 14, fontWeight: 700, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</p>
                            <Link href="/api/auth/signout" style={{ fontSize: 12, color: "#64748b", fontWeight: 500, textDecoration: "none" }}>Sign out</Link>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

