import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);

        // Only Admins can change plans
        if (!session || session.user.role !== "Admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const resolvedParams = await params;
        const id = resolvedParams.id;
        const { plan } = await req.json();

        if (!plan) {
            return NextResponse.json({ error: "Plan is required" }, { status: 400 });
        }

        await connectToDatabase();

        // Update the user's plan
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { plan },
            { new: true }
        ).select("-password -__v");

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(updatedUser);

    } catch (error) {
        console.error("Error updating user plan:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
