import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import User from "@/lib/models/User";
import bcrypt from "bcrypt";

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const role = searchParams.get('role');

        if (session.user.role === "Receptionist" && role !== "Doctor") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        if (session.user.role === "Patient" && role !== "Doctor") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();

        let query: any = {};
        if (role) {
            query.role = role;
        }

        if (session.user.role !== "SuperAdmin") {
            query.clinicId = (session.user as any).clinicId;
        }

        const users = await User.find(query).select('-password');
        return NextResponse.json(users);

    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (session?.user?.role !== "Admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { name, email, password, role } = body;

        if (!name || !email || !password || !role) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        await connectToDatabase();

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "Email already registered" }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            clinicId: (session.user as any).clinicId,
            subscriptionPlan: role === "Doctor" ? "Pro" : undefined
        });

        // Remove password from response
        const userWithoutPassword = { ...newUser.toObject() };
        delete userWithoutPassword.password;

        return NextResponse.json(userWithoutPassword, { status: 201 });

    } catch (error) {
        console.error("Failed to create user:", error);
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}

