import mongoose, { Schema, model, models } from "mongoose";

const PatientSchema = new Schema(
    {
        name: { type: String, required: true },
        age: { type: Number, required: true },
        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            required: true,
        },
        contact: { type: String, required: true },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User", // Receptionist or Admin who created it
            required: true,
        },
        clinicId: {
            type: Schema.Types.ObjectId,
            ref: "User", // The Admin of this clinic
            required: true,
        },
    },
    { timestamps: true }
);

const Patient = models.Patient || model("Patient", PatientSchema);

export default Patient;

