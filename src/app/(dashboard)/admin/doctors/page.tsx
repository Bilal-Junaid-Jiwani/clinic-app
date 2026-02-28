import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ManageUsersClient } from "@/components/ManageDoctorsClient";

export default async function ManageDoctorsPage() {
    const session = await getServerSession(authOptions);

    if (session?.user?.role !== "Admin") {
        redirect("/");
    }

    return (
        <ManageUsersClient roleName="Doctor" icon="👨‍⚕️" />
    );
}
