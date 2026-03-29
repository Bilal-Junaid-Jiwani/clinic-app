import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import User from "@/lib/models/User";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (session?.user?.role !== "SuperAdmin") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
        }

        const { id, email } = await req.json();

        if (!id || !email) {
            return NextResponse.json({ message: "Missing node ID or email" }, { status: 400 });
        }

        await connectToDatabase();

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { status: "active", subscriptionExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ message: "Node not found" }, { status: 404 });
        }

        // Send activation email
        const htmlContent = `
            <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; background: #0F0B2E; color: white; padding: 40px; border-radius: 16px;">
                <div style="text-align: center; margin-bottom: 32px;">
                    <div style="display: inline-block; padding: 8px 16px; background: rgba(124, 58, 237, 0.2); border: 1px solid rgba(124, 58, 237, 0.4); border-radius: 50px; color: #C4B5FD; font-size: 12px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase;">
                        System Notification
                    </div>
                </div>
                <h1 style="font-size: 28px; font-weight: 900; margin-bottom: 16px; text-align: center;">Node Initialized Successfully</h1>
                <p style="color: #A9A3C2; font-size: 16px; line-height: 1.6; text-align: center; margin-bottom: 32px;">
                    Welcome to the Aether ecosystem. Your architecture has been fully provisioned by the governance team and is now active.
                </p>
                <div style="background: #1A1145; padding: 24px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1); margin-bottom: 32px;">
                    <p style="margin: 0 0 12px 0; color: #8B85A5; font-size: 14px; text-transform: uppercase; font-weight: bold;">Connection Details</p>
                    <p style="margin: 0 0 8px 0;"><strong>Clinic ID:</strong> ${updatedUser.name}</p>
                    <p style="margin: 0 0 8px 0;"><strong>Access Email:</strong> ${updatedUser.email}</p>
                    <p style="margin: 0;"><strong>Authorized Role:</strong> Lead Architect (Admin)</p>
                </div>
                <div style="text-align: center;">
                    <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/login" style="display: inline-block; padding: 16px 32px; background: #7C3AED; color: white; text-decoration: none; font-weight: bold; border-radius: 12px; box-shadow: 0 4px 20px rgba(124, 58, 237, 0.4);">Access Terminals</a>
                </div>
                <p style="text-align: center; margin-top: 40px; color: #6B6585; font-size: 12px;">
                    Automated transmission from Aether Infrastructure.
                </p>
            </div>
        `;

        await sendEmail({
            to: email,
            subject: "Aether Architecture Activation Complete",
            html: htmlContent,
        });

        return NextResponse.json({ message: "Account activated and email sent" }, { status: 200 });
    } catch (error) {
        console.error("Approval error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

