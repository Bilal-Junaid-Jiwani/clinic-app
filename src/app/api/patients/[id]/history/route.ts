import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Appointment from "@/lib/models/Appointment";
import Prescription from "@/lib/models/Prescription";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectToDatabase();

        const appointments = await Appointment.find({ patientId: id }).populate("doctorId", "name").sort({ date: -1 }).lean();
        const prescriptions = await Prescription.find({ patientId: id }).populate("doctorId", "name").sort({ createdAt: -1 }).lean();

        return NextResponse.json({ appointments, prescriptions });
    } catch (error) {
        console.error("Error fetching patient history:", error);
        return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
    }
}
