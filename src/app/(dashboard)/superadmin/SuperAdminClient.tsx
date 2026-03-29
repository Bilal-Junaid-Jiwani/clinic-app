"use client";

import { useState } from "react";

interface AdminUser {
    _id: string;
    name: string;
    email: string;
    plan: string;
    createdAt: string;
    status: string;
    subscriptionExpiry?: string;
    subscriptionPlan?: string;
}

interface Stats {
    totalActive: number;
    pending: number;
    mrr: number;
    distribution: {
        starter: number;
        pro: number;
        enterprise: number;
    };
    ecosystem: {
        patients: number;
        appointments: number;
        prescriptions: number;
    };
}

export default function SuperAdminClient({ initialPending, initialActive, stats: initialStats }: { initialPending: AdminUser[], initialActive: AdminUser[], stats: Stats }) {
    const [pending, setPending] = useState<AdminUser[]>(initialPending);
    const [active, setActive] = useState<AdminUser[]>(initialActive);
    const [stats, setStats] = useState<Stats>(initialStats);
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const approveNode = async (id: string, email: string) => {
        setLoadingId(id);
        try {
            const res = await fetch("/api/superadmin/approve", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, email }),
            });

            if (res.ok) {
                // Move from pending to active
                const approvedUser = pending.find(u => u._id === id);
                if (approvedUser) {
                    approvedUser.status = "active";
                    setPending(prev => prev.filter(u => u._id !== id));
                    setActive(prev => [approvedUser, ...prev]);
                }
            } else {
                alert("Failed to approve node.");
            }
        } catch (error) {
            console.error(error);
            alert("Error approving node.");
        } finally {
            setLoadingId(null);
        }
    };

    const renewNode = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to add 30 days to ${name}'s billing cycle?`)) return;
        setLoadingId(id + '-renew');
        try {
            const res = await fetch("/api/superadmin/renew", {
                method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id })
            });
            if (res.ok) {
                const data = await res.json();
                setActive(prev => prev.map(u => u._id === id ? { ...u, subscriptionExpiry: data.expiry } : u));
                alert(`Renewed! New expiry: ${new Date(data.expiry).toLocaleDateString()}`);
            } else alert("Failed to renew.");
        } catch { alert("Error renewing."); } finally { setLoadingId(null); }
    };

    const deactivateNode = async (id: string, name: string) => {
        if (!confirm(`CRITICAL: Are you absolutely sure you want to suspend ${name}? All telemetry will be cut off.`)) return;
        setLoadingId(id + '-deactivate');
        try {
            const res = await fetch("/api/superadmin/deactivate", {
                method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id })
            });
            if (res.ok) {
                setActive(prev => prev.filter(u => u._id !== id));
            } else alert("Failed to suspend.");
        } catch { alert("Error suspending."); } finally { setLoadingId(null); }
    };

    const updatePlan = async (id: string, newPlan: string) => {
        setLoadingId(id + '-plan');
        try {
            const res = await fetch("/api/superadmin/update-plan", {
                method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, plan: newPlan })
            });
            if (res.ok) {
                setActive(prev => prev.map(u => u._id === id ? { ...u, plan: newPlan } : u));
                alert(`Architecture upgraded to ${newPlan}`);
            } else alert("Protocol failure updating plan.");
        } catch { alert("Error updating architecture tier."); } finally { setLoadingId(null); }
    };

    return (
        <div className="space-y-12">
            {/* Analytics Deck */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white border border-[#E9E5F5] rounded-3xl p-6 shadow-sm">
                    <p className="text-xs font-black text-[#8B85A5] uppercase tracking-widest mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]"></span> Total Projected MRR
                    </p>
                    <h3 className="text-3xl font-black text-[#1E1B3A]">${stats.mrr.toLocaleString()}</h3>
                </div>
                <div className="bg-white border border-[#E9E5F5] rounded-3xl p-6 shadow-sm">
                    <p className="text-xs font-black text-[#8B85A5] uppercase tracking-widest mb-2 flex items-center gap-2">
                         <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span> Active Nodes
                    </p>
                    <h3 className="text-3xl font-black text-[#1E1B3A]">{stats.totalActive}</h3>
                </div>
                <div className="bg-white border border-[#E9E5F5] rounded-3xl p-6 shadow-sm">
                    <p className="text-xs font-black text-[#8B85A5] uppercase tracking-widest mb-2 flex items-center gap-2">
                         <span className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]"></span> Pending Deploy
                    </p>
                    <h3 className="text-3xl font-black text-[#1E1B3A]">{stats.pending}</h3>
                </div>
                <div className="bg-white border border-[#E9E5F5] rounded-3xl p-6 shadow-sm">
                    <p className="text-xs font-black text-[#8B85A5] uppercase tracking-widest mb-2 flex items-center gap-2">
                         <span className="w-1.5 h-1.5 rounded-full bg-[#1E1B3A]"></span> Tier Heatmap
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="h-2 bg-[#7C3AED]/20 hover:bg-[#7C3AED] transition-colors flex-1 rounded-full relative group">
                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-0.5 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">Starter: {stats.distribution.starter}</span>
                        </div>
                        <div className="h-2 bg-[#7C3AED]/50 hover:bg-[#7C3AED] transition-colors flex-1 rounded-full relative group">
                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-0.5 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">Pro: {stats.distribution.pro}</span>
                        </div>
                        <div className="h-2 bg-[#7C3AED] hover:bg-[#4C1D95] transition-colors flex-1 rounded-full relative group">
                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-0.5 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">Ent: {stats.distribution.enterprise}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ecosystem Health Deck */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#1E1B3A] text-white rounded-3xl p-6 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-3xl rounded-full"></div>
                    <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span> Total Patients Synchronized
                    </p>
                    <h3 className="text-3xl font-black">{stats.ecosystem.patients}</h3>
                </div>
                <div className="bg-[#1E1B3A] text-white rounded-3xl p-6 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-3xl rounded-full"></div>
                    <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                         <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]"></span> Global Appointments
                    </p>
                    <h3 className="text-3xl font-black">{stats.ecosystem.appointments}</h3>
                </div>
                <div className="bg-[#1E1B3A] text-white rounded-3xl p-6 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-3xl rounded-full"></div>
                    <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                         <span className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]"></span> Prescription Transmissions
                    </p>
                    <h3 className="text-3xl font-black">{stats.ecosystem.prescriptions}</h3>
                </div>
            </div>

            {/* Pending Approvals */}
            <section>
                <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-[#1E1B3A]">
                    <span className="w-2 h-2 rounded-full bg-[#FFBD2E] animate-pulse"></span>
                    Pending Node Provisioning
                </h2>
                
                {pending.length === 0 ? (
                    <div className="bg-white border border-[#E9E5F5] rounded-2xl p-8 text-center text-[#8B85A5]">
                        No pending subscriptions tracking in the queue.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pending.map((admin) => (
                            <div key={admin._id} className="bg-white border border-[#FFBD2E]/30 rounded-2xl p-6 shadow-sm flex flex-col relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFBD2E] to-[#F59E0B]"></div>
                                
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-[#1E1B3A]">{admin.name}</h3>
                                        <p className="text-sm text-[#8B85A5] truncate max-w-[200px]">{admin.email}</p>
                                    </div>
                                    <span className="bg-[#FFBD2E]/10 text-[#D97706] text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                                        {admin.plan}
                                    </span>
                                </div>
                                
                                <p className="text-xs text-[#A9A3C2] mb-6 flex-1">
                                    Registered: {new Date(admin.createdAt).toLocaleDateString()}
                                </p>
                                
                                <button 
                                    onClick={() => approveNode(admin._id, admin.email)}
                                    disabled={loadingId === admin._id}
                                    className="w-full py-2.5 bg-[#10B981] hover:bg-[#059669] text-white font-bold rounded-xl transition-colors disabled:opacity-50"
                                >
                                    {loadingId === admin._id ? "Provisioning..." : "Approve & Send Keys"}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Active Nodes */}
            <section>
                <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-[#1E1B3A]">
                    <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                    Active Architect Nodes
                </h2>
                
                <div className="bg-white border border-[#E9E5F5] rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#F5F3FF] text-[#6B6585] font-semibold border-b border-[#E9E5F5]">
                            <tr>
                                <th className="px-6 py-4">Clinic / Admin</th>
                                <th className="px-6 py-4">Architecture Plan</th>
                                <th className="px-6 py-4">Cycle Expiration</th>
                                <th className="px-6 py-4 text-right">Node Protocol</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E9E5F5]">
                            {active.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-[#8B85A5]">
                                        No active nodes currently running in the ecosystem.
                                    </td>
                                </tr>
                            ) : (
                                active.map((admin) => (
                                    <tr key={admin._id} className="hover:bg-[#FAFAFE] transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-[#1E1B3A]">{admin.name}</p>
                                            <p className="text-xs text-[#8B85A5]">{admin.email}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select 
                                                value={admin.plan}
                                                onChange={(e) => updatePlan(admin._id, e.target.value)}
                                                disabled={loadingId === admin._id + '-plan'}
                                                className="bg-transparent text-[#7C3AED] font-bold text-xs uppercase tracking-wider focus:outline-none cursor-pointer hover:underline disabled:opacity-50"
                                            >
                                                <option value="Starter">Starter</option>
                                                <option value="Pro">Professional</option>
                                                <option value="Enterprise">Enterprise</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4">
                                            {admin.subscriptionExpiry ? (
                                                <div className="flex flex-col">
                                                    <span className="text-[#1E1B3A] font-semibold">{new Date(admin.subscriptionExpiry).toLocaleDateString()}</span>
                                                    <span className={`text-xs font-bold ${new Date(admin.subscriptionExpiry).getTime() - Date.now() < 7 * 86400000 ? 'text-red-500' : 'text-[#8B85A5]'}`}>
                                                        {Math.max(0, Math.ceil((new Date(admin.subscriptionExpiry).getTime() - Date.now()) / 86400000))} days left
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-[#8B85A5] italic text-xs">Unregistered</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button 
                                                    onClick={() => renewNode(admin._id, admin.name)}
                                                    disabled={loadingId === admin._id + '-renew'}
                                                    className="px-3 py-1.5 bg-[#10B981]/10 text-[#10B981] hover:bg-[#10B981] hover:text-white rounded-lg text-xs font-bold transition-colors disabled:opacity-50"
                                                >
                                                    Extend 30D
                                                </button>
                                                <button 
                                                    onClick={() => deactivateNode(admin._id, admin.name)}
                                                    disabled={loadingId === admin._id + '-deactivate'}
                                                    className="px-3 py-1.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg text-xs font-bold transition-colors disabled:opacity-50"
                                                >
                                                    Suspend
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

