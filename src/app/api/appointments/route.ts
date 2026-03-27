import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Appointment from "@/lib/models/Appointment";
import Patient from "@/lib/models/Patient";
import User from "@/lib/models/User";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();

        let query: any = {};
        if (session.user.role !== "SuperAdmin") {
            query.clinicId = (session.user as any).clinicId;
        }

        // Filter by role
        if (session.user.role === "Doctor") {
            query.doctorId = session.user.id;
        } else if (session.user.role === "Patient") {
            // Link by createdBy or name for MVP
            const patient = await Patient.findOne({
                $or: [{ createdBy: session.user.id }, { name: session.user.name }]
            });
            if (patient) {
                query.patientId = patient._id;
            } else {
                return NextResponse.json({ appointments: [] }, { status: 200 });
            }
        }

        const appointments = await Appointment.find(query)
            .populate("patientId", "name contact age")
            .populate("doctorId", "name email")
            .sort({ date: 1 });

        return NextResponse.json({ appointments }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { patientId, doctorId, date, age = 25, gender = "Other", contact = "000000000" } = await req.json();

        let finalPatientId = patientId;

        if (session.user.role === "Patient") {
            let patient = await Patient.findOne({
                $or: [{ createdBy: session.user.id }, { name: session.user.name }]
            });
            if (!patient) {
                patient = await Patient.create({
                    name: session.user.name,
                    age,
                    gender,
                    contact,
                    createdBy: session.user.id,
                });
            }
            finalPatientId = patient._id;
        }

        if (!finalPatientId || !doctorId || !date) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        await connectToDatabase();

        const newAppointment = await Appointment.create({
            patientId: finalPatientId,
            doctorId,
            date,
            status: "Pending",
            clinicId: (session.user as any).clinicId,
        });

        return NextResponse.json({ appointment: newAppointment }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

