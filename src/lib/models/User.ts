import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ["SuperAdmin", "Admin", "Doctor", "Receptionist", "Patient"],
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "active"],
            default: "active",
        },
        plan: {
            type: String,
            enum: ['Free', 'Standard', 'Pro'],
            default: 'Free'
        },
        clinicId: {
            type: Schema.Types.ObjectId,
            ref: 'User', // Refers to the Admin who owns the clinic. (If role=Admin, clinicId = self._id)
            required: false // SuperAdmins don't have a clinic. 
        },
        subscriptionExpiry: {
            type: Date,
            required: false
        }
    },
    { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;

