import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (session?.user?.role !== "SuperAdmin") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
        }

        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ message: "Missing node ID" }, { status: 400 });
        }

        await connectToDatabase();

        // Get current user to see if they have an active expiry
        const user = await User.findById(id);
        if (!user) {
            return NextResponse.json({ message: "Node not found" }, { status: 404 });
        }

        // Add 30 days to either current expiry or from today if already expired
        const now = Date.now();
        const currentExpiry = user.subscriptionExpiry ? new Date(user.subscriptionExpiry).getTime() : now;
        const newExpiryDate = new Date(Math.max(now, currentExpiry) + 30 * 24 * 60 * 60 * 1000);

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { status: "active", subscriptionExpiry: newExpiryDate },
            { new: true }
        );

        return NextResponse.json({ message: "Node renewed for 30 days", expiry: newExpiryDate }, { status: 200 });
    } catch (error) {
        console.error("Renewal error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

