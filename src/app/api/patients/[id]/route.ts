import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Patient from "@/lib/models/Patient";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { id } = await params;
        await connectToDatabase();
        
        const query: any = { _id: id };
        if (session.user.role !== "SuperAdmin") {
            query.clinicId = (session.user as any).clinicId;
        }

        const patient = await Patient.findOne(query).populate("createdBy", "name");

        if (!patient) return NextResponse.json({ error: "Patient not found" }, { status: 404 });

        return NextResponse.json({ patient }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user.role !== "Admin" && session.user.role !== "Receptionist")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const updates = await req.json();

        // Validate allowed fields
        const allowed = ["name", "age", "gender", "contact"];
        const filtered: any = {};
        for (const key of allowed) {
            if (updates[key] !== undefined) filtered[key] = updates[key];
        }

        if (Object.keys(filtered).length === 0) {
            return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
        }

        await connectToDatabase();
        
        const query: any = { 
            _id: id,
            clinicId: (session.user as any).clinicId 
        };
        
        const updated = await Patient.findOneAndUpdate(query, filtered, { new: true });

        if (!updated) return NextResponse.json({ error: "Patient not found" }, { status: 404 });

        return NextResponse.json({ patient: updated }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
