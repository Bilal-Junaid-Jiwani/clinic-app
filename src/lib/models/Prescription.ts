import mongoose, { Schema, model, models } from "mongoose";

const PrescriptionSchema = new Schema(
    {
        patientId: {
            type: Schema.Types.ObjectId,
            ref: "Patient",
            required: true,
        },
        doctorId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        medicines: [
            {
                name: { type: String, required: true },
                dosage: { type: String, required: true },
                duration: { type: String, required: true },
            },
        ],
        instructions: { type: String },
        diagnosis: { type: String },
    },
    { timestamps: true } // adds createdAt automatically
);

const Prescription = models.Prescription || model("Prescription", PrescriptionSchema);

export default Prescription;
