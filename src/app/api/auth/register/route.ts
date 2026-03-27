import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/lib/models/User";
import bcrypt from "bcrypt";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
    try {
        const { name, email, password, plan } = await req.json();

        if (!name || !email || !password || !plan) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: "Email already exists" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Admins created via public registration are always 'pending'
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: "Admin",
            status: "pending",
            plan: plan,
        });

        await newUser.save();

        // Send 'Payment Processing' Receipt instantly
        await sendEmail({
            to: email,
            subject: "Nexis Node Provisioning - Payment Processing",
            html: `
            <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; background: #0F0B2E; color: white; padding: 40px; border-radius: 16px;">
                <div style="text-align: center; margin-bottom: 32px;">
                    <div style="display: inline-block; padding: 8px 16px; background: rgba(124, 58, 237, 0.2); border: 1px solid rgba(124, 58, 237, 0.4); border-radius: 50px; color: #C4B5FD; font-size: 12px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase;">
                        Payment Received
                    </div>
                </div>
                <h1 style="font-size: 28px; font-weight: 900; margin-bottom: 16px; text-align: center;">Node Pending Verification</h1>
                <p style="color: #A9A3C2; font-size: 16px; line-height: 1.6; text-align: center; margin-bottom: 32px;">
                    Thank you for processing your deployment of the <strong>${plan}</strong> architecture. We have received your payment pipeline. 
                    <br/><br/>
                    Your node is currently undergoing SuperAdmin provisioning. You will receive an automated confirmation email containing your final access keys once the deployment activates.
                </p>
            </div>
            `
        });

        return NextResponse.json(
            { message: "Registration successful. Pending SuperAdmin approval." },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { message: "An error occurred during registration" },
            { status: 500 }
        );
    }
}

