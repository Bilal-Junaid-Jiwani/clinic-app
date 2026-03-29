"use client";

import { useState, useEffect } from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from "recharts";

const COLORS = ["#7C3AED", "#A78BFA", "#C4B5FD", "#DDD6FE", "#EDE9FE"];
const STATUS_COLORS = { pending: "#F59E0B", confirmed: "#0EA5E9", completed: "#10B981", cancelled: "#F43F5E" };

export default function AdminAnalyticsClient() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/analytics/admin")
            .then(r => r.json())
            .then(d => setData(d))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => <div key={i} className="stat-card p-6"><div className="skeleton h-4 w-24 mb-3"></div><div className="skeleton h-8 w-16"></div></div>)}
            </div>
            <div className="glass-card p-8"><div className="skeleton h-64 w-full rounded-xl"></div></div>
        </div>
    );

    if (!data) return null;

    const statusData = [
        { name: "Pending", value: data.statusBreakdown?.pending || 0, color: STATUS_COLORS.pending },
        { name: "Confirmed", value: data.statusBreakdown?.confirmed || 0, color: STATUS_COLORS.confirmed },
        { name: "Completed", value: data.statusBreakdown?.completed || 0, color: STATUS_COLORS.completed },
        { name: "Cancelled", value: data.statusBreakdown?.cancelled || 0, color: STATUS_COLORS.cancelled },
    ];

    const riskData = (data.topDiagnoses || []).map((d: any, i: number) => ({
        name: d._id || "N/A",
        count: d.count,
        fill: COLORS[i % COLORS.length],
    }));

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Patients", value: data.totalPatients, icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
                    { label: "Active Doctors", value: data.totalDoctors, icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
                    { label: "Total Bookings", value: data.totalAppointments, icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
                    { label: "Revenue (Sim)", value: `$${(data.revenue || 0).toLocaleString()}`, icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
                ].map((stat, i) => (
                    <div key={i} className="stat-card group">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-black text-[#8B85A5] uppercase tracking-widest">{stat.label}</p>
                                <p className="text-3xl font-black text-[#1E1B3A] mt-2">{stat.value}</p>
                            </div>
                            <div className="icon-wrapper">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} />
                                </svg>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Monthly Appointments Chart */}
                <div className="lg:col-span-2 glass-card p-8">
                    <h2 className="section-title mb-6">Monthly Appointments (Last 6 Months)</h2>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={data.monthlyData || []}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E9E5F5" />
                            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#8B85A5", fontWeight: 600 }} />
                            <YAxis tick={{ fontSize: 12, fill: "#8B85A5", fontWeight: 600 }} />
                            <Tooltip
                                contentStyle={{ borderRadius: 12, border: "1px solid #E9E5F5", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                            />
                            <Bar dataKey="appointments" fill="#7C3AED" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Status Breakdown Pie */}
                <div className="glass-card p-8">
                    <h2 className="section-title mb-6">Appointment Status</h2>
                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <Pie
                                data={statusData}
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={90}
                                paddingAngle={4}
                                dataKey="value"
                            >
                                {statusData.map((entry, index) => (
                                    <Cell key={index} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E9E5F5" }} />
                            <Legend iconType="circle" wrapperStyle={{ fontSize: 12, fontWeight: 600 }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Risk Distribution + Management Links */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="glass-card p-8">
                    <h2 className="section-title mb-4">Diagnosis Risk Levels</h2>
                    {riskData.length === 0 ? (
                        <p className="text-sm text-[#8B85A5]">No diagnosis data yet.</p>
                    ) : (
                        <div className="space-y-3">
                            {riskData.map((d: any, i: number) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full" style={{ background: d.fill }} />
                                        <span className="text-sm font-semibold text-[#1E1B3A]">{d.name}</span>
                                    </div>
                                    <span className="text-sm font-bold text-[#8B85A5]">{d.count}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Management Quick Links */}
                <div className="lg:col-span-2 glass-card p-8">
                    <h2 className="section-title mb-6">Operations</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { href: "/admin/doctors", title: "Medical Staff", desc: "Manage doctor profiles", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
                            { href: "/admin/receptionists", title: "Front Desk", desc: "Manage receptionists", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },

                        ].map((link, i) => (
                            <a key={i} href={link.href} className="group flex items-center justify-between p-5 rounded-xl border border-[#E9E5F5] bg-white hover:border-[#8B5CF6] transition-all shadow-sm hover:shadow-md">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-[#F5F3FF] flex items-center justify-center text-[#7C3AED]">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={link.icon} /></svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#1E1B3A] group-hover:text-[#7C3AED] transition-colors">{link.title}</h3>
                                        <p className="text-xs text-[#8B85A5] font-medium">{link.desc}</p>
                                    </div>
                                </div>
                                <svg className="w-5 h-5 text-[#C4B5FD] group-hover:text-[#7C3AED] group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Plan Card */}
            <div className="glass-card p-8 border-0 shadow-xl relative overflow-hidden text-white" style={{ background: "linear-gradient(135deg, #7C3AED, #0F0B2E)" }}>
                <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(255,255,255,0.1)" }} />
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
                    <div>
                        <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>Current Plan</p>
                        <h2 className="text-4xl font-black">PRO ✨</h2>
                        <p className="text-sm text-[#C4B5FD] mt-1 font-medium">Unlimited Access • AI Enabled • Advanced Analytics</p>
                    </div>
                    <div className="px-8 py-3 bg-white/10 text-white border border-white/20 font-extrabold rounded-xl transition-colors shadow-lg text-sm italic">
                        Node Active
                    </div>
                </div>
            </div>
        </div>
    );
}

