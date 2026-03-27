"use client";

import { useState, useEffect } from "react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

export default function DoctorAnalyticsClient() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/analytics/doctor")
            .then(r => r.json())
            .then(d => setData(d))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading || !data) return null;

    return (
        <div className="glass-card p-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="section-title">Performance Trends</h2>
                <span className="badge badge-brand">{data.completionRate}% Completion</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-[#F5F3FF] rounded-xl">
                    <p className="text-2xl font-black text-[#7C3AED]">{data.appointmentsThisMonth}</p>
                    <p className="text-xs font-bold text-[#8B85A5] uppercase tracking-wider">Visits This Month</p>
                </div>
                <div className="text-center p-3 bg-[#F5F3FF] rounded-xl">
                    <p className="text-2xl font-black text-[#7C3AED]">{data.prescriptionsThisMonth}</p>
                    <p className="text-xs font-bold text-[#8B85A5] uppercase tracking-wider">Rx This Month</p>
                </div>
                <div className="text-center p-3 bg-[#F5F3FF] rounded-xl">
                    <p className="text-2xl font-black text-[#7C3AED]">{data.totalDiagnoses}</p>
                    <p className="text-xs font-bold text-[#8B85A5] uppercase tracking-wider">AI Diagnoses</p>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
                <LineChart data={data.monthlyData || []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E9E5F5" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#8B85A5", fontWeight: 600 }} />
                    <YAxis tick={{ fontSize: 12, fill: "#8B85A5", fontWeight: 600 }} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E9E5F5" }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 12, fontWeight: 600 }} />
                    <Line type="monotone" dataKey="appointments" stroke="#7C3AED" strokeWidth={3} dot={{ r: 5, fill: "#7C3AED" }} name="Consultations" />
                    <Line type="monotone" dataKey="prescriptions" stroke="#10B981" strokeWidth={3} dot={{ r: 5, fill: "#10B981" }} name="Prescriptions" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
