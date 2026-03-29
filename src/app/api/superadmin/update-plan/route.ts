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

        const { id, plan } = await req.json();

        if (!id || !plan) {
            return NextResponse.json({ message: "Missing node ID or plan" }, { status: 400 });
        }

        await connectToDatabase();

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { subscriptionPlan: plan },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ message: "Node not found" }, { status: 404 });
        }

        return NextResponse.json({ message: `Node upgraded to ${plan}`, plan: updatedUser.subscriptionPlan }, { status: 200 });
    } catch (error) {
        console.error("Plan update error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
