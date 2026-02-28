"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

type StaffMember = {
    _id: string;
    name: string;
    email: string;
    role: string;
    plan: string;
};

// Helper for SVGs
const SvgIcon = ({ path, className = "w-4 h-4" }: { path: string, className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={path} />
    </svg>
);

export default function SubscriptionManager({ initialStaff }: { initialStaff: StaffMember[] }) {
    const [staff, setStaff] = useState<StaffMember[]>(initialStaff);
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const availablePlans = ["Free", "Standard", "Pro"];

    const updatePlan = async (userId: string, newPlan: string) => {
        setLoadingId(userId);

        try {
            const res = await fetch(`/api/users/${userId}/plan`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ plan: newPlan }),
            });

            if (!res.ok) throw new Error("Failed to update plan");

            // Optimistic UI update
            setStaff(staff.map(user =>
                user._id === userId ? { ...user, plan: newPlan } : user
            ));

            toast.success("Plan updated successfully", {
                style: { borderRadius: '10px', background: '#333', color: '#fff' }
            });
        } catch (error) {
            toast.error("Error updating plan");
            console.error(error);
        } finally {
            setLoadingId(null);
        }
    };

    if (staff.length === 0) {
        return (
            <div className="p-12 text-center text-gray-500 font-medium">
                No staff members found in the system yet.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="premium-table">
                <thead>
                    <tr>
                        <th>Staff Member</th>
                        <th>Role</th>
                        <th>Current Plan</th>
                        <th>Assign Plan</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {staff.map((user) => (
                        <tr key={user._id} className="group">
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366f1] to-[#312e81] flex items-center justify-center text-white font-bold text-sm shadow-sm">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 leading-tight">{user.name}</p>
                                        <p className="text-[11px] font-medium text-gray-500 mt-0.5">{user.email}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span className={`badge ${user.role === 'Doctor' ? 'badge-semantic-blue' : 'badge-semantic-amber'
                                    }`}>
                                    <SvgIcon path={user.role === 'Doctor'
                                        ? "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                                        : "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    } className="w-3.5 h-3.5 mr-1 inline-block" />
                                    {user.role}
                                </span>
                            </td>
                            <td>
                                <span className={`badge ${user.plan === 'Pro' ? 'bg-[#4f46e5]/10 text-[#4f46e5] border border-[#4f46e5]/20' :
                                        user.plan === 'Standard' ? 'badge-semantic-green' : 'bg-gray-100 text-gray-600'
                                    }`}>
                                    {user.plan === 'Pro' && <span className="mr-1">✨</span>}
                                    {user.plan}
                                </span>
                            </td>
                            <td className="w-48">
                                <select
                                    className="premium-input py-1.5 px-3 text-xs w-full cursor-pointer"
                                    value={user.plan}
                                    onChange={(e) => updatePlan(user._id, e.target.value)}
                                    disabled={loadingId === user._id}
                                >
                                    {availablePlans.map(plan => (
                                        <option key={plan} value={plan}>{plan}</option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                {loadingId === user._id ? (
                                    <div className="w-5 h-5 border-2 border-[#4f46e5] border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <button
                                        onClick={() => updatePlan(user._id, user.plan === "Pro" ? "Standard" : "Pro")}
                                        className="text-xs font-bold text-[#4f46e5] hover:text-[#312e81] transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100"
                                    >
                                        <SvgIcon path="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        Toggle Plan
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
