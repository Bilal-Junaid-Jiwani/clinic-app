import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ["Admin", "Doctor", "Receptionist", "Patient"],
            required: true,
        },
        plan: {
            type: String,
            enum: ['Free', 'Standard', 'Pro'],
            default: 'Free'
        }
    },
    { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
