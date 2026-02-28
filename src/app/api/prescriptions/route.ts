import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Prescription from "@/lib/models/Prescription";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();

        let query: any = {};
        if (session.user.role === "Doctor") {
            query.doctorId = session.user.id;
        } else if (session.user.role === "Patient") {
            const PatientModel = (await import("@/lib/models/Patient")).default;
            const patient = await PatientModel.findOne({
                $or: [{ createdBy: session.user.id }, { name: session.user.name }]
            });
            if (patient) {
                query.patientId = patient._id;
            } else {
                return NextResponse.json({ prescriptions: [] }, { status: 200 });
            }
        }

        const prescriptions = await Prescription.find(query)
            .populate("patientId", "name contact")
            .populate("doctorId", "name")
            .sort({ createdAt: -1 });

        return NextResponse.json({ prescriptions }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "Doctor") {
            return NextResponse.json({ error: "Unauthorized. Only Doctors can create prescriptions." }, { status: 401 });
        }

        const { patientId, medicines, instructions } = await req.json();

        if (!patientId || !medicines || medicines.length === 0) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        await connectToDatabase();

        const newPrescription = await Prescription.create({
            patientId,
            doctorId: session.user.id,
            medicines,
            instructions,
        });

        return NextResponse.json({ prescription: newPrescription }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
