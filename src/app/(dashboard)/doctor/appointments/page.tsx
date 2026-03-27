"use client";
import { useState, useEffect } from "react";

export default function DoctorAppointmentsPage() {
    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ patientId: "", date: "" });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => { loadAll(); }, []);

    const loadAll = async () => {
        try {
            const [aRes, pRes] = await Promise.all([
                fetch("/api/appointments"),
                fetch("/api/patients")
            ]);
            if (aRes.ok) {
                const data = await aRes.json();
                setAppointments(data.appointments || []);
            }
            if (pRes.ok) {
                const data = await pRes.json();
                setPatients(data.patients || []);
            }
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const sessionRes = await fetch("/api/auth/session");
            const session = await sessionRes.json();

            const res = await fetch("/api/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, doctorId: session.user?.id })
            });
            if (res.ok) {
                setShowForm(false);
                setForm({ patientId: "", date: "" });
                loadAll();
            } else {
                const data = await res.json();
                alert(data.error || "Failed");
            }
        } catch (e: any) { alert(e.message); }
        finally { setSubmitting(false); }
    };

    const updateStatus = async (id: string, status: string) => {
        await fetch(`/api/appointments/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
        loadAll();
    };

    const statusColors: Record<string, string> = { Pending: "badge-amber", Confirmed: "badge-blue", Completed: "badge-green", Cancelled: "badge-red" };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-black text-[#1E1B3A] tracking-tight">My Appointments</h1>
                    <p className="text-sm text-[#8B85A5] font-medium">View and manage your scheduled appointments.</p>
                </div>
                <button onClick={() => setShowForm(!showForm)} className={showForm ? "btn-secondary" : "btn-primary"}>
                    {showForm ? "Cancel" : "+ Book Appointment"}
                </button>
            </div>

            {showForm && (
                <div className="glass-card p-6 animate-fade-in">
                    <h2 className="section-title mb-4">Book Follow-up / New Appointment</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                        <div>
                            <label className="block text-xs font-bold text-[#6B6585] uppercase tracking-wider mb-1.5">Patient</label>
                            <select className="premium-input" required value={form.patientId} onChange={(e) => setForm({ ...form, patientId: e.target.value })}>
                                <option value="">Select Patient</option>
                                {patients.map((p: any) => <option key={p._id} value={p._id}>{p.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-[#6B6585] uppercase tracking-wider mb-1.5">Date & Time</label>
                            <input type="datetime-local" className="premium-input" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                        </div>
                        <div className="md:col-span-2">
                            <button type="submit" disabled={submitting} className="btn-primary">{submitting ? "Booking..." : "Book Appointment"}</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="glass-card overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center"><div className="skeleton h-4 w-48 mx-auto"></div></div>
                ) : appointments.length === 0 ? (
                    <div className="p-12 text-center text-[#8B85A5]"><p className="text-4xl mb-2">📅</p><p>No appointments found.</p></div>
                ) : (
                    <table className="premium-table">
                        <thead><tr><th>Patient</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                            {appointments.map((a: any) => (
                                <tr key={a._id}>
                                    <td className="font-semibold text-[#1E1B3A]">{a.patientId?.name || "N/A"}</td>
                                    <td>{new Date(a.date).toLocaleString()}</td>
                                    <td><span className={`badge ${statusColors[a.status] || "badge-gray"}`}>{a.status}</span></td>
                                    <td>
                                        <div className="flex gap-1">
                                            {a.status === "Confirmed" && <button onClick={() => updateStatus(a._id, "Completed")} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-lg font-medium hover:bg-emerald-100 transition-colors">Complete</button>}
                                        </div>
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
