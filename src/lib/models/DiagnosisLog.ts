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
    },
    { timestamps: true } // adds createdAt automatically
);

const DiagnosisLog = models.DiagnosisLog || model("DiagnosisLog", DiagnosisLogSchema);

export default DiagnosisLog;
