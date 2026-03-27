import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import connectToDatabase from "@/lib/mongodb";
import User from "@/lib/models/User";
import SuperAdminClient from "./SuperAdminClient";

export default async function SuperAdminPage() {
    const session = await getServerSession(authOptions);

    if (session?.user?.role !== "SuperAdmin") {
        redirect("/");
    }

    await connectToDatabase();

    // Fetch all pending Admnins
    const pendingAdmins = await User.find({ role: "Admin", status: "pending" }).lean();
    const activeAdmins = await User.find({ role: "Admin", status: "active" }).lean();

    return (
        <div className="max-w-7xl mx-auto animate-fade-in">
            <header className="mb-8">
                <h1 className="text-3xl font-black text-[#1E1B3A] tracking-tight">Super Architect Node</h1>
                <p className="text-sm font-medium text-[#8B85A5] mt-1">Manage tenant subscriptions and infrastructure access.</p>
            </header>

            <SuperAdminClient 
                initialPending={JSON.parse(JSON.stringify(pendingAdmins))}
                initialActive={JSON.parse(JSON.stringify(activeAdmins))}
            />
        </div>
    );
}

