import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Appointment from "@/lib/models/Appointment";
import Prescription from "@/lib/models/Prescription";
import DiagnosisLog from "@/lib/models/DiagnosisLog";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "Doctor") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();
        const doctorId = session.user.id;

        // Basic counts
        const totalAppointments = await Appointment.countDocuments({ doctorId });
        const totalPrescriptions = await Prescription.countDocuments({ doctorId });
        const totalDiagnoses = await DiagnosisLog.countDocuments({ doctorId });

        // Today's count
        const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
        const todayEnd = new Date(); todayEnd.setHours(23, 59, 59, 999);
        const todayAppointments = await Appointment.countDocuments({
            doctorId,
            date: { $gte: todayStart, $lte: todayEnd },
        });

        // Monthly trends (last 6 months)
        const now = new Date();
        const monthlyData = [];
        for (let i = 5; i >= 0; i--) {
            const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);
            const appointments = await Appointment.countDocuments({
                doctorId,
                date: { $gte: start, $lte: end },
            });
            const prescriptions = await Prescription.countDocuments({
                doctorId,
                createdAt: { $gte: start, $lte: end },
            });
            monthlyData.push({
                month: start.toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
                appointments,
                prescriptions,
            });
        }

        // This month stats
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const prescriptionsThisMonth = await Prescription.countDocuments({
            doctorId,
            createdAt: { $gte: monthStart },
        });
        const appointmentsThisMonth = await Appointment.countDocuments({
            doctorId,
            date: { $gte: monthStart },
        });

        // Completion rate
        const completed = await Appointment.countDocuments({ doctorId, status: "Completed" });
        const completionRate = totalAppointments > 0 ? Math.round((completed / totalAppointments) * 100) : 0;

        return NextResponse.json({
            totalAppointments,
            totalPrescriptions,
            totalDiagnoses,
            todayAppointments,
            monthlyData,
            prescriptionsThisMonth,
            appointmentsThisMonth,
            completionRate,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

