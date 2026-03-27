"use client";
import { useState, useEffect } from "react";

export default function ReceptionistPatientsPage() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ name: "", age: "", gender: "Male", contact: "" });
    const [submitting, setSubmitting] = useState(false);
    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState({ name: "", age: "", gender: "", contact: "" });

    useEffect(() => { fetchPatients(); }, []);

    const fetchPatients = async () => {
        try {
            const res = await fetch("/api/patients");
            if (res.ok) {
                const data = await res.json();
                setPatients(data.patients || []);
            }
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch("/api/patients", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, age: Number(form.age) })
            });
            if (res.ok) {
                setShowForm(false);
                setForm({ name: "", age: "", gender: "Male", contact: "" });
                fetchPatients();
            } else {
                const data = await res.json();
                alert(data.error || "Failed");
            }
        } catch (e: any) { alert(e.message); }
        finally { setSubmitting(false); }
    };

    const startEdit = (p: any) => {
        setEditingId(p._id);
        setEditForm({ name: p.name, age: String(p.age), gender: p.gender, contact: p.contact });
    };

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingId) return;
        setSubmitting(true);
        try {
            const res = await fetch(`/api/patients/${editingId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...editForm, age: Number(editForm.age) })
            });
            if (res.ok) {
                setEditingId(null);
                fetchPatients();
            } else {
                const data = await res.json();
                alert(data.error || "Failed to update");
            }
        } catch (e: any) { alert(e.message); }
        finally { setSubmitting(false); }
    };

    const filtered = patients.filter((p: any) =>
        p.name?.toLowerCase().includes(search.toLowerCase()) || p.contact?.includes(search)
    );

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-black text-[#1E1B3A] tracking-tight">Patient Management</h1>
                    <p className="text-sm text-[#8B85A5] font-medium">Register, search, edit, and manage clinic patients.</p>
                </div>
                <button onClick={() => { setShowForm(!showForm); setEditingId(null); }} className={showForm ? "btn-secondary" : "btn-primary"}>
                    {showForm ? "Cancel" : "+ Register Patient"}
                </button>
            </div>

            {showForm && (
                <div className="glass-card p-6 animate-fade-in">
                    <h2 className="section-title mb-4">Register New Patient</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                        <div>
                            <label className="block text-xs font-bold text-[#6B6585] uppercase tracking-wider mb-1.5">Full Name *</label>
                            <input className="premium-input" required placeholder="Patient name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-[#6B6585] uppercase tracking-wider mb-1.5">Age *</label>
                            <input className="premium-input" type="number" required min={0} max={150} placeholder="Age" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-[#6B6585] uppercase tracking-wider mb-1.5">Gender *</label>
                            <select className="premium-input" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-[#6B6585] uppercase tracking-wider mb-1.5">Contact Number *</label>
                            <input className="premium-input" required placeholder="03xx-xxxxxxx" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
                        </div>
                        <div className="md:col-span-2">
                            <button type="submit" disabled={submitting} className="btn-primary">{submitting ? "Registering..." : "Register Patient"}</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Edit Modal */}
            {editingId && (
                <div className="glass-card p-6 animate-fade-in border-l-4 border-l-[#7C3AED]">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="section-title">Edit Patient</h2>
                        <button onClick={() => setEditingId(null)} className="text-[#8B85A5] hover:text-[#1E1B3A] transition-colors text-sm font-bold">✕ Cancel</button>
                    </div>
                    <form onSubmit={handleEdit} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                        <div>
                            <label className="block text-xs font-bold text-[#6B6585] uppercase tracking-wider mb-1.5">Full Name</label>
                            <input className="premium-input" required value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-[#6B6585] uppercase tracking-wider mb-1.5">Age</label>
                            <input className="premium-input" type="number" required min={0} max={150} value={editForm.age} onChange={(e) => setEditForm({ ...editForm, age: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-[#6B6585] uppercase tracking-wider mb-1.5">Gender</label>
                            <select className="premium-input" value={editForm.gender} onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-[#6B6585] uppercase tracking-wider mb-1.5">Contact</label>
                            <input className="premium-input" required value={editForm.contact} onChange={(e) => setEditForm({ ...editForm, contact: e.target.value })} />
                        </div>
                        <div className="md:col-span-2">
                            <button type="submit" disabled={submitting} className="btn-primary">{submitting ? "Saving..." : "Save Changes"}</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Search */}
            <input className="premium-input max-w-md" placeholder="🔍 Search patients by name or contact..." value={search} onChange={(e) => setSearch(e.target.value)} />

            {/* Table */}
            <div className="glass-card overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center"><div className="skeleton h-4 w-48 mx-auto mb-3"></div><div className="skeleton h-4 w-32 mx-auto"></div></div>
                ) : filtered.length === 0 ? (
                    <div className="p-12 text-center text-[#8B85A5]">
                        <p className="text-4xl mb-2">👥</p>
                        <p className="font-medium">No patients found.</p>
                    </div>
                ) : (
                    <table className="premium-table">
                        <thead><tr><th>Name</th><th>Age</th><th>Gender</th><th>Contact</th><th>Actions</th></tr></thead>
                        <tbody>
                            {filtered.map((p: any) => (
                                <tr key={p._id}>
                                    <td className="font-semibold text-[#1E1B3A]">{p.name}</td>
                                    <td>{p.age}</td>
                                    <td><span className={`badge ${p.gender === "Male" ? "badge-blue" : p.gender === "Female" ? "badge-purple" : "badge-gray"}`}>{p.gender}</span></td>
                                    <td>{p.contact}</td>
                                    <td>
                                        <button onClick={() => startEdit(p)} className="text-xs font-bold text-[#7C3AED] hover:text-[#4C1D95] transition-colors flex items-center gap-1">
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

