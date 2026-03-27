import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Appointment from "@/lib/models/Appointment";
import DiagnosisLog from "@/lib/models/DiagnosisLog";
import Patient from "@/lib/models/Patient";
import { checkPlanAccess } from "@/lib/planGate";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "Admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Plan gating
        const { allowed, userPlan } = await checkPlanAccess("Pro");
        if (!allowed) {
            return NextResponse.json({
                error: "Predictive Analytics requires a Pro plan.",
                currentPlan: userPlan,
                upgrade: true,
            }, { status: 403 });
        }

        await connectToDatabase();

        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

        // Most common risk levels this month
        const riskDistribution = await DiagnosisLog.aggregate([
            { $match: { createdAt: { $gte: monthStart } } },
            { $group: { _id: "$riskLevel", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]);

        // Patient load per day (last 7 days)
        const dailyLoad = [];
        for (let i = 6; i >= 0; i--) {
            const dayStart = new Date(now);
            dayStart.setDate(dayStart.getDate() - i);
            dayStart.setHours(0, 0, 0, 0);
            const dayEnd = new Date(dayStart);
            dayEnd.setHours(23, 59, 59, 999);

            const count = await Appointment.countDocuments({
                date: { $gte: dayStart, $lte: dayEnd },
            });
            dailyLoad.push({
                day: dayStart.toLocaleDateString("en-US", { weekday: "short" }),
                date: dayStart.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
                patients: count,
            });
        }

        // Patient growth (last 6 months)
        const patientGrowth = [];
        for (let i = 5; i >= 0; i--) {
            const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);
            const count = await Patient.countDocuments({ createdAt: { $gte: start, $lte: end } });
            patientGrowth.push({
                month: start.toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
                newPatients: count,
            });
        }

        // Forecast: average daily load → predict next week
        const totalLast7 = dailyLoad.reduce((sum, d) => sum + d.patients, 0);
        const avgDaily = totalLast7 / 7;
        const forecastNextWeek = Math.round(avgDaily * 7);

        // Total diagnoses this month
        const totalDiagnosesThisMonth = await DiagnosisLog.countDocuments({ createdAt: { $gte: monthStart } });

        return NextResponse.json({
            riskDistribution,
            dailyLoad,
            patientGrowth,
            forecastNextWeek,
            avgDailyPatients: Math.round(avgDaily * 10) / 10,
            totalDiagnosesThisMonth,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
