"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface SidebarClientProps {
    role: string;
    name: string;
    links: { name: string; href: string; icon: string }[];
}

const Icons: Record<string, React.ReactNode> = {
    overview: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
    doctors: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
    receptionists: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    plans: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
    appointments: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    patients: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    ai: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    prescriptions: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
};

export default function SidebarClient({ role, name, links }: SidebarClientProps) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    const sidebar = (
        <aside className={`
            fixed lg:static inset-y-0 left-0 z-50 w-[272px] flex flex-col
            transition-transform duration-300 ease-in-out
            bg-[#0a1628]
            ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}>
            {/* Top accent line */}
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#14b8a6] to-transparent opacity-70" />

            {/* Logo */}
            <div className="px-6 py-5 flex items-center justify-between border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#14b8a6] to-[#0d9488] flex items-center justify-center shadow-[0_0_18px_rgba(20,184,166,0.35)]">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-lg font-black text-white tracking-tight leading-none">Clinic<span className="text-[#2dd4bf]">AI</span></h1>
                        <span className="text-[10px] font-bold text-[#2dd4bf]/70 uppercase tracking-widest">{role}</span>
                    </div>
                </div>
                <button onClick={() => setOpen(false)} className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
                <p className="px-3 text-[10px] font-black text-slate-500 uppercase tracking-[0.12em] mb-4">Menu</p>
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
                            className={`flex items-center gap-3 px-3.5 py-3 text-sm font-semibold rounded-xl transition-all duration-200 group relative
                                ${isActive
                                    ? "bg-[#14b8a6]/[0.12] text-[#2dd4bf] border border-[#14b8a6]/20"
                                    : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200 border border-transparent"
                                }`}
                        >
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] bg-[#14b8a6] rounded-r-full" />
                            )}
                            <span className={`flex-shrink-0 transition-transform duration-200 ${isActive ? "text-[#14b8a6]" : "group-hover:text-slate-300 group-hover:scale-110"}`}>
                                {Icons[link.icon] || Icons["overview"]}
                            </span>
                            <span>{link.name}</span>
                            {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#14b8a6]" />}
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile */}
            <div className="p-3 border-t border-white/[0.06]">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.07] transition group">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#0d9488] flex items-center justify-center text-white font-black text-sm shadow-[0_0_12px_rgba(20,184,166,0.3)]">
                        {name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">{name}</p>
                        <Link href="/api/auth/signout" className="text-xs text-slate-500 hover:text-[#2dd4bf] transition-colors font-medium">Sign out</Link>
                    </div>
                </div>
            </div>
        </aside>
    );

    return (
        <>
            <button onClick={() => setOpen(true)} className="lg:hidden fixed top-4 left-4 z-40 p-2.5 rounded-xl bg-[#0a1628] text-white shadow-xl border border-white/10 hover:bg-[#0f2040] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            {open && <div className="sidebar-overlay lg:hidden" onClick={() => setOpen(false)} />}
            {sidebar}
        </>
    );
}
