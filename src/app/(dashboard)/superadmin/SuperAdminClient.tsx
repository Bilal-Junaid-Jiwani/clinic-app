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
}

export default function SuperAdminClient({ initialPending, initialActive }: { initialPending: AdminUser[], initialActive: AdminUser[] }) {
    const [pending, setPending] = useState<AdminUser[]>(initialPending);
    const [active, setActive] = useState<AdminUser[]>(initialActive);
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

    return (
        <div className="space-y-12">
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
                                            <span className="inline-flex bg-[#7C3AED]/10 text-[#7C3AED] px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
                                                {admin.plan}
                                            </span>
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

