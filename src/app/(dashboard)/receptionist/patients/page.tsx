"use client";
import { useState, useEffect } from "react";

export default function ReceptionistPatientsPage() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ name: "", age: "", gender: "Male", contact: "" });
    const [submitting, setSubmitting] = useState(false);
    const [search, setSearch] = useState("");

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

    const filtered = patients.filter((p: any) =>
        p.name?.toLowerCase().includes(search.toLowerCase()) || p.contact?.includes(search)
    );

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-black text-[#1E1B3A] tracking-tight">Patient Management</h1>
                    <p className="text-sm text-[#8B85A5] font-medium">Register, search, and manage clinic patients.</p>
                </div>
                <button onClick={() => setShowForm(!showForm)} className={showForm ? "btn-secondary" : "btn-primary"}>
                    {showForm ? "Cancel" : "+ Register Patient"}
                </button>
            </div>

            {showForm && (
                <div className="glass-card p-6 animate-fade-in">
                    <h2 className="section-title mb-4">Register New Patient</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                        <div>
                            <label className="block text-xs font-bold text-[#6B6585] uppercase tracking-wider mb-1.5">Full Name</label>
                            <input className="premium-input" required placeholder="Patient name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-[#6B6585] uppercase tracking-wider mb-1.5">Age</label>
                            <input className="premium-input" type="number" required min={0} max={150} placeholder="Age" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-[#6B6585] uppercase tracking-wider mb-1.5">Gender</label>
                            <select className="premium-input" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-[#6B6585] uppercase tracking-wider mb-1.5">Contact Number</label>
                            <input className="premium-input" required placeholder="03xx-xxxxxxx" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
                        </div>
                        <div className="md:col-span-2">
                            <button type="submit" disabled={submitting} className="btn-primary">{submitting ? "Registering..." : "Register Patient"}</button>
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
                        <thead><tr><th>Name</th><th>Age</th><th>Gender</th><th>Contact</th></tr></thead>
                        <tbody>
                            {filtered.map((p: any) => (
                                <tr key={p._id}>
                                    <td className="font-semibold text-[#1E1B3A]">{p.name}</td>
                                    <td>{p.age}</td>
                                    <td><span className={`badge ${p.gender === "Male" ? "badge-blue" : p.gender === "Female" ? "badge-purple" : "badge-gray"}`}>{p.gender}</span></td>
                                    <td>{p.contact}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
