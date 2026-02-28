import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    // Redirect authenticated users to their respective dashboards
    const role = session.user.role.toLowerCase();
    redirect(`/${role}`);
  }

  // Redirect unauthenticated users to login
  redirect("/login");
}
