import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Appointment from "@/lib/models/Appointment";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { id } = await params;
        const body = await request.json();
        await connectToDatabase();

        const updated = await Appointment.findByIdAndUpdate(id, { status: body.status }, { new: true });
        if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error updating appointment:", error);
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}
