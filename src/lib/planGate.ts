import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import User from "@/lib/models/User";

/**
 * Check if the user's plan meets the required level.
 * Plan hierarchy: Free < Standard < Pro
 */
export async function checkPlanAccess(requiredPlan: "Standard" | "Pro"): Promise<{ allowed: boolean; userPlan: string }> {
    const session = await getServerSession(authOptions);
    if (!session) return { allowed: false, userPlan: "none" };

    await connectToDatabase();
    const user = await User.findById(session.user.id).select("plan").lean();
    const userPlan = (user as any)?.plan || "Free";

    const planHierarchy: Record<string, number> = { Free: 0, Standard: 1, Pro: 2 };
    const userLevel = planHierarchy[userPlan] ?? 0;
    const requiredLevel = planHierarchy[requiredPlan] ?? 0;

    return { allowed: userLevel >= requiredLevel, userPlan };
}
