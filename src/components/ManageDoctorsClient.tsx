"use client";

import { useState, useEffect } from "react";

export function ManageUsersClient({ roleName, icon }: { roleName: string, icon: string }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, [roleName]);

    const fetchUsers = async () => {
        try {
            const res = await fetch(`/api/users?role=${roleName}`);
            const data = await res.json();
            if (res.ok) {
                setUsers(data);
            }
        } catch (error) {
            console.error(`Failed to fetch ${roleName}s`, error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, role: roleName })
            });

            if (res.ok) {
                alert(`${roleName} created successfully!`);
                setShowAddForm(false);
                setName("");
                setEmail("");
                setPassword("");
                fetchUsers();
            } else {
                const data = await res.json();
                alert(data.error || `Failed to create ${roleName}`);
            }
        } catch (error) {
            console.error(`Error creating ${roleName}`, error);
            alert("Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-black text-[#1E1B3A] tracking-tight">Manage {roleName}s</h1>
                    <p className="text-sm font-medium text-[#8B85A5] mt-1">Add, view, and manage {roleName.toLowerCase()} accounts.</p>
                </div>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className={showAddForm ? "btn-secondary" : "btn-primary"}
                >
                    {showAddForm ? "Cancel" : `+ Add New ${roleName}`}
                </button>
            </div>

            {showAddForm && (
                <div className="glass-card p-6 animate-fade-in">
                    <h2 className="section-title mb-4">Add New {roleName}</h2>
                    <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                        <div>
                            <label className="block text-xs font-bold text-[#6B6585] uppercase tracking-wider mb-1.5">Full Name</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="premium-input"
                                placeholder="E.g. John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-[#6B6585] uppercase tracking-wider mb-1.5">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="premium-input"
                                placeholder={`${roleName.toLowerCase()}@clinic.com`}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-[#6B6585] uppercase tracking-wider mb-1.5">Temporary Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minLength={6}
                                className="premium-input"
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="flex items-end">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="btn-primary w-full"
                            >
                                {submitting ? "Creating..." : `Create ${roleName} Account`}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="glass-card overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center"><div className="skeleton h-4 w-48 mx-auto mb-3"></div><div className="skeleton h-4 w-32 mx-auto"></div></div>
                ) : users.length === 0 ? (
                    <div className="p-12 text-center text-[#8B85A5]">
                        <p className="text-4xl mb-3">{icon}</p>
                        <p className="font-semibold">No {roleName.toLowerCase()}s found.</p>
                        <p className="text-sm mt-1">Click &quot;Add New {roleName}&quot; to create the first account.</p>
                    </div>
                ) : (
                    <table className="premium-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user: any) => (
                                <tr key={user._id}>
                                    <td className="font-semibold text-[#1E1B3A]">{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className="badge badge-brand">
                                            {user.role}
                                        </span>
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

