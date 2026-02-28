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
            // Need doctorId, but API can derive it or we can get user ID from session.
            // Wait, our API expects doctorId in body. Let's pass session.user.id if we had it,
            // or we fetch user session. Instead, easiest is /api/auth/session or 
            // the API could handle deriving. But we pass doctorId: "auto_from_session_in_api_would_be_better"
            // Wait, we can get session using getSession() from next-auth/react.
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
                    <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
                    <p className="text-sm text-gray-500">View and manage your scheduled appointments.</p>
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
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Patient</label>
                            <select className="premium-input" required value={form.patientId} onChange={(e) => setForm({ ...form, patientId: e.target.value })}>
                                <option value="">Select Patient</option>
                                {patients.map((p: any) => <option key={p._id} value={p._id}>{p.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Date & Time</label>
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
                    <div className="p-12 text-center text-gray-400"><p className="text-4xl mb-2">📅</p><p>No appointments found.</p></div>
                ) : (
                    <table className="premium-table">
                        <thead><tr><th>Patient</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                            {appointments.map((a: any) => (
                                <tr key={a._id}>
                                    <td className="font-medium text-gray-900">{a.patientId?.name || "N/A"}</td>
                                    <td>{new Date(a.date).toLocaleString()}</td>
                                    <td><span className={`badge ${statusColors[a.status] || "badge-gray"}`}>{a.status}</span></td>
                                    <td>
                                        <div className="flex gap-1">
                                            {a.status === "Confirmed" && <button onClick={() => updateStatus(a._id, "Completed")} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-lg font-medium hover:bg-green-100">Complete</button>}
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
