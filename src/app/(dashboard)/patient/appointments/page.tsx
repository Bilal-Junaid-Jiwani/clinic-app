"use client";
import { useState, useEffect } from "react";

export default function PatientAppointmentsPage() {
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ doctorId: "", date: "" });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => { loadAll(); }, []);

    const loadAll = async () => {
        try {
            const [aRes, dRes] = await Promise.all([
                fetch("/api/appointments"),
                fetch("/api/users?role=Doctor")
            ]);
            if (aRes.ok) {
                const data = await aRes.json();
                setAppointments(data.appointments || []);
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
                setForm({ doctorId: "", date: "" });
                loadAll();
            } else {
                const data = await res.json();
                alert(data.error || "Failed");
            }
        } catch (e: any) { alert(e.message); }
        finally { setSubmitting(false); }
    };

    const statusColors: Record<string, string> = { Pending: "badge-amber", Confirmed: "badge-blue", Completed: "badge-green", Cancelled: "badge-red" };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-black text-[#1E1B3A] tracking-tight">My Appointments</h1>
                    <p className="text-sm text-[#8B85A5] font-medium">Track your appointment history and schedule new visits.</p>
                </div>
                <button onClick={() => setShowForm(!showForm)} className={showForm ? "btn-secondary w-full sm:w-auto" : "btn-primary w-full sm:w-auto"}>
                    {showForm ? "Cancel" : "+ Book Waitlist"}
                </button>
            </div>

            {showForm && (
                <div className="glass-card p-6 animate-fade-in">
                    <h2 className="section-title mb-4">Book New Appointment</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl">
                        <div>
                            <label className="block text-xs font-bold text-[#6B6585] uppercase tracking-wider mb-1.5">Select Doctor</label>
                            <select className="premium-input" required value={form.doctorId} onChange={(e) => setForm({ ...form, doctorId: e.target.value })}>
                                <option value="">Select a Doctor</option>
                                {doctors.map((d: any) => <option key={d._id} value={d._id}>Dr. {d.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-[#6B6585] uppercase tracking-wider mb-1.5">Preferred Date & Time</label>
                            <input type="datetime-local" className="premium-input" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                            <p className="text-xs text-[#8B85A5] mt-1">Pending approval from the clinic.</p>
                        </div>
                        <div className="md:col-span-2">
                            <button type="submit" disabled={submitting} className="btn-primary w-full sm:w-auto">{submitting ? "Booking..." : "Submit Booking Request"}</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="glass-card overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center"><div className="skeleton h-4 w-48 mx-auto"></div></div>
                ) : appointments.length === 0 ? (
                    <div className="p-12 text-center text-[#8B85A5]"><p className="text-4xl mb-2">📅</p><p>No appointments yet.</p></div>
                ) : (
                    <table className="premium-table">
                        <thead><tr><th>Doctor</th><th>Date</th><th>Status</th></tr></thead>
                        <tbody>
                            {appointments.map((a: any) => (
                                <tr key={a._id}>
                                    <td className="font-semibold text-[#1E1B3A]">{a.doctorId?.name || "N/A"}</td>
                                    <td>{new Date(a.date).toLocaleString()}</td>
                                    <td><span className={`badge ${statusColors[a.status] || "badge-gray"}`}>{a.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

