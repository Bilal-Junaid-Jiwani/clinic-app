import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Patient from "@/lib/models/Patient";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();

        // If Admin or Receptionist, they might see all patients.
        // A doctor might only see their assigned patients, but for simplicity we fetch all.
        const patients = await Patient.find({}).sort({ createdAt: -1 });

        return NextResponse.json({ patients }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user.role !== "Admin" && session.user.role !== "Receptionist")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { name, age, gender, contact } = await req.json();

        if (!name || !age || !gender || !contact) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        await connectToDatabase();

        const newPatient = await Patient.create({
            name,
            age,
            gender,
            contact,
            createdBy: session.user.id,
        });

        return NextResponse.json({ patient: newPatient }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
