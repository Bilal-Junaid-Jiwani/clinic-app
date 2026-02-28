import connectToDatabase from "./src/lib/mongodb";
import User from "./src/lib/models/User";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";

process.env.MONGODB_URI = "mongodb+srv://bilaljunaid:Junaid4kzb@cluster0.kgp9ebj.mongodb.net/?appName=Cluster0";

async function seed() {
    await connectToDatabase();
    console.log("Connected to MongoDB for seeding...");

    await User.deleteMany({});
    console.log("Cleared existing users.");

    const hashedAdminPassword = await bcrypt.hash("admin123", 10);
    const hashedDoctorPassword = await bcrypt.hash("doctor123", 10);
    const hashedReceptionistPassword = await bcrypt.hash("rec123", 10);
    const hashedPatientPassword = await bcrypt.hash("patient123", 10);

    const users = [
        {
            name: "Super Admin",
            email: "admin@test.com",
            password: hashedAdminPassword,
            role: "Admin",
            subscriptionPlan: "Pro",
        },
        {
            name: "Dr. Gregory House",
            email: "doctor@test.com",
            password: hashedDoctorPassword,
            role: "Doctor",
            subscriptionPlan: "Pro",
        },
        {
            name: "Pam Beesly",
            email: "receptionist@test.com",
            password: hashedReceptionistPassword,
            role: "Receptionist",
        },
        {
            name: "John Doe",
            email: "patient@test.com",
            password: hashedPatientPassword,
            role: "Patient",
        },
    ];

    await User.insertMany(users);
    console.log("Database seeded successfully with test users!");
    process.exit(0);
}

seed().catch((err) => {
    console.error(err);
    process.exit(1);
});
