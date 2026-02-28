"use client";
import { useState, useEffect } from "react";

export default function ReceptionistAppointmentsPage() {
    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ patientId: "", doctorId: "", date: "", status: "Pending" });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => { loadAll(); }, []);

    const loadAll = async () => {
        try {
            const [aRes, pRes, dRes] = await Promise.all([
                fetch("/api/appointments"),
                fetch("/api/patients"),
                fetch("/api/users?role=Doctor")
            ]);
            if (aRes.ok) {
                const data = await aRes.json();
                setAppointments(data.appointments || []);
            }
            if (pRes.ok) {
                const data = await pRes.json();
                setPatients(data.patients || []);
            }
            if (dRes.ok) setDoctors(await dRes.json());
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch("/api/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });
            if (res.ok) {
                setShowForm(false);
                setForm({ patientId: "", doctorId: "", date: "", status: "Pending" });
                loadAll();
            } else {
                const data = await res.json();
                alert(data.error || "Failed");
            }
        } catch (e: any) { alert(e.message); }
        finally { setSubmitting(false); }
    };

    const updateStatus = async (id: string, status: string) => {
        try {
            await fetch(`/api/appointments/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            });
            loadAll();
        } catch (e) { console.error(e); }
    };

    const statusColors: Record<string, string> = {
        Pending: "badge-amber",
        Confirmed: "badge-blue",
        Completed: "badge-green",
        Cancelled: "badge-red"
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Appointment Management</h1>
                    <p className="text-sm text-gray-500">Book, manage, and track appointments.</p>
                </div>
                <button onClick={() => setShowForm(!showForm)} className={showForm ? "btn-secondary" : "btn-primary"}>
                    {showForm ? "Cancel" : "+ Book Appointment"}
                </button>
            </div>

            {showForm && (
                <div className="glass-card p-6 animate-fade-in">
                    <h2 className="section-title mb-4">Book New Appointment</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Patient</label>
                            <select className="premium-input" required value={form.patientId} onChange={(e) => setForm({ ...form, patientId: e.target.value })}>
                                <option value="">Select Patient</option>
                                {patients.map((p: any) => <option key={p._id} value={p._id}>{p.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Doctor</label>
                            <select className="premium-input" required value={form.doctorId} onChange={(e) => setForm({ ...form, doctorId: e.target.value })}>
                                <option value="">Select Doctor</option>
                                {doctors.map((d: any) => <option key={d._id} value={d._id}>{d.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Date & Time</label>
                            <input type="datetime-local" className="premium-input" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                        </div>
                        <div className="flex items-end">
                            <button type="submit" disabled={submitting} className="btn-primary w-full">{submitting ? "Booking..." : "Book Appointment"}</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="glass-card overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center"><div className="skeleton h-4 w-48 mx-auto mb-3"></div><div className="skeleton h-4 w-32 mx-auto"></div></div>
                ) : appointments.length === 0 ? (
                    <div className="p-12 text-center text-gray-400">
                        <p className="text-4xl mb-2">📅</p>
                        <p className="font-medium">No appointments yet.</p>
                    </div>
                ) : (
                    <table className="premium-table">
                        <thead><tr><th>Patient</th><th>Doctor</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                            {appointments.map((a: any) => (
                                <tr key={a._id}>
                                    <td className="font-medium text-gray-900">{a.patientId?.name || "N/A"}</td>
                                    <td>{a.doctorId?.name || "N/A"}</td>
                                    <td>{new Date(a.date).toLocaleString()}</td>
                                    <td><span className={`badge ${statusColors[a.status] || "badge-gray"}`}>{a.status}</span></td>
                                    <td>
                                        <div className="flex gap-1">
                                            {a.status === "Pending" && <button onClick={() => updateStatus(a._id, "Confirmed")} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-lg font-medium hover:bg-blue-100">Confirm</button>}
                                            {(a.status === "Pending" || a.status === "Confirmed") && <button onClick={() => updateStatus(a._id, "Completed")} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-lg font-medium hover:bg-green-100">Complete</button>}
                                            {a.status !== "Cancelled" && a.status !== "Completed" && <button onClick={() => updateStatus(a._id, "Cancelled")} className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded-lg font-medium hover:bg-red-100">Cancel</button>}
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
