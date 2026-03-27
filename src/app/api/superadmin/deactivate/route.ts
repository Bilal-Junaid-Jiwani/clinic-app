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

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { status: "suspended", $unset: { subscriptionExpiry: "" } },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ message: "Node not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Node suspended successfully" }, { status: 200 });
    } catch (error) {
        console.error("Deactivation error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

