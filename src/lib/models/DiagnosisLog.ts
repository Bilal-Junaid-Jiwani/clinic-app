import mongoose, { Schema, model, models } from "mongoose";

const DiagnosisLogSchema = new Schema(
    {
        symptoms: { type: String, required: true },
        aiResponse: { type: String, required: true },
        riskLevel: {
            type: String,
            enum: ["Low", "Medium", "High", "Critical"],
            required: true,
        },
        doctorId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        patientId: {
            type: Schema.Types.ObjectId,
            ref: "Patient",
        },
        age: { type: Number },
        gender: { type: String, enum: ["Male", "Female", "Other"] },
        clinicId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const DiagnosisLog = models.DiagnosisLog || model("DiagnosisLog", DiagnosisLogSchema);

export default DiagnosisLog;

