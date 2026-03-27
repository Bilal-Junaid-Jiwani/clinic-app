import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    status: { type: String, default: "active" },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    const email = "superadmin@clinic.com";
    const existing = await User.findOne({ email });

    if (existing) {
      console.log("SuperAdmin already exists.");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("password123", 10);

    const superAdmin = new User({
      name: "System Architect",
      email,
      password: hashedPassword,
      role: "SuperAdmin",
      status: "active",
    });

    await superAdmin.save();
    console.log("SuperAdmin seeded successfully! Login with superadmin@clinic.com / password123");
    
    process.exit(0);
  } catch (error) {
    console.error("Error seeding DB:", error);
    process.exit(1);
  }
}

seed();
