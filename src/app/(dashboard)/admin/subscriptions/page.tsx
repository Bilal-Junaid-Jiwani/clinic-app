import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import connectToDatabase from "@/lib/mongodb";
import User from "@/lib/models/User";
import SubscriptionManager from "./SubscriptionManager";

// Helper for SVGs
const SvgIcon = ({ path }: { path: string }) => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={path} />
    </svg>
);

export default async function SubscriptionsPage() {
    const session = await getServerSession(authOptions);

    if (session?.user?.role !== "Admin") {
        redirect("/");
    }

    await connectToDatabase();

    // Fetch all staff (Doctors and Receptionists)
    const staff = await User.find({ role: { $in: ["Doctor", "Receptionist"] } })
        .select("-password")
        .lean()
        .sort({ role: 1, name: 1 });

    // Transform ObjectIds to strings for Client Component
    const serializedStaff = staff.map(user => ({
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        plan: user.plan || "Free", // Default if not set
    }));

    return (
        <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">Subscription Management</h1>
                    <p className="text-sm font-medium text-gray-500 mt-1">Assign and manage billing plans for your clinic staff.</p>
                </div>
            </div>

            {/* Platform Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 !bg-gradient-to-br !from-[#4f46e5] !to-[#312e81] border-0 text-white relative overflow-hidden shadow-xl">
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="relative z-10 flex justify-between items-start">
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest text-[#c7d2fe] mb-1">Platform Tier</p>
                            <h2 className="text-3xl font-black tracking-tighter">Enterprise✨</h2>
                            <p className="text-xs font-medium text-white/70 mt-2">Unlimited clinic scale.</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                            <SvgIcon path="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Pro Users</p>
                            <h2 className="text-3xl font-black text-gray-900">{serializedStaff.filter(s => s.plan === "Pro").length}</h2>
                        </div>
                        <div className="icon-wrapper">
                            <SvgIcon path="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Standard Users</p>
                            <h2 className="text-3xl font-black text-gray-900">{serializedStaff.filter(s => s.plan === "Standard" || s.plan === "Free").length}</h2>
                        </div>
                        <div className="icon-wrapper bg-gray-50 text-gray-500 border-gray-200">
                            <SvgIcon path="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </div>
                    </div>
                </div>
            </div>

            {/* The interactive client component for managing staff plans */}
            <div className="glass-card overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="section-title text-lg">Staff Plan Assignments</h2>
                    <span className="badge badge-brand">{serializedStaff.length} Total</span>
                </div>
                <SubscriptionManager initialStaff={serializedStaff} />
            </div>
        </div>
    );
}
