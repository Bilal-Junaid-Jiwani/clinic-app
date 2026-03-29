import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminAnalyticsClient from "@/components/AdminAnalytics";

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "Admin") redirect("/");

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-black text-[#1E1B3A] tracking-tight">Organization Overview</h1>
                    <p className="text-sm font-medium text-[#8B85A5] mt-1">Analytics and management for Aether.</p>
                </div>
            </div>
            <AdminAnalyticsClient />
        </div>
    );
}

