import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "./mongodb";
import User from "./models/User";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password");
                }

                await connectToDatabase();

                const user = await User.findOne({ email: credentials.email });

                if (!user || !user.password) {
                    throw new Error("Invalid email or password");
                }

                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isPasswordValid) {
                    throw new Error("Invalid email or password");
                }

                if (user.status === "pending") {
                    throw new Error("Subscription pending approval.");
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    subscriptionPlan: user.subscriptionPlan,
                    status: user.status,
                    clinicId: user.role === "Admin" ? user._id.toString() : user.clinicId?.toString(),
                    subscriptionExpiry: (user as any).subscriptionExpiry,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
                token.subscriptionPlan = (user as any).subscriptionPlan;
                token.status = (user as any).status;
                token.clinicId = (user as any).clinicId;
                token.subscriptionExpiry = (user as any).subscriptionExpiry;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id;
                (session.user as any).role = token.role;
                (session.user as any).subscriptionPlan = token.subscriptionPlan;
                (session.user as any).status = token.status;
                (session.user as any).clinicId = token.clinicId;
                (session.user as any).subscriptionExpiry = token.subscriptionExpiry;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

