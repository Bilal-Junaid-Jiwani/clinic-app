import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Patient from "@/lib/models/Patient";
import Appointment from "@/lib/models/Appointment";
import Prescription from "@/lib/models/Prescription";
import DiagnosisLog from "@/lib/models/DiagnosisLog";
import User from "@/lib/models/User";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "Admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();

        const clinicId = (session.user as any).clinicId;
        const query: any = { clinicId };

        // Basic counts
        const totalPatients = await Patient.countDocuments(query);
        const totalDoctors = await User.countDocuments({ ...query, role: "Doctor" });
        const totalReceptionists = await User.countDocuments({ ...query, role: "Receptionist" });
        const totalAppointments = await Appointment.countDocuments(query);

        // Monthly appointments (last 6 months)
        const now = new Date();
        const monthlyData = [];
        for (let i = 5; i >= 0; i--) {
            const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);
            const count = await Appointment.countDocuments({ ...query, date: { $gte: start, $lte: end } });
            monthlyData.push({
                month: start.toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
                appointments: count,
            });
        }

        // Appointment status breakdown
        const statusBreakdown = {
            pending: await Appointment.countDocuments({ ...query, status: "Pending" }),
            confirmed: await Appointment.countDocuments({ ...query, status: "Confirmed" }),
            completed: await Appointment.countDocuments({ ...query, status: "Completed" }),
            cancelled: await Appointment.countDocuments({ ...query, status: "Cancelled" }),
        };

        // Top 5 diagnoses from DiagnosisLog
        const topDiagnoses = await DiagnosisLog.aggregate([
            { $match: { clinicId: new (require('mongoose')).Types.ObjectId(clinicId) } },
            { $group: { _id: "$riskLevel", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 },
        ]);

        // Simulated revenue
        const revenue = totalAppointments * 150 + totalPatients * 50;

        // Recent appointments
        const recentAppointments = await Appointment.find(query)
            .populate("patientId", "name")
            .populate("doctorId", "name")
            .sort({ date: -1 })
            .limit(5)
            .lean();

        return NextResponse.json({
            totalPatients,
            totalDoctors,
            totalReceptionists,
            totalAppointments,
            monthlyData,
            statusBreakdown,
            topDiagnoses,
            revenue,
            recentAppointments,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

