import mongoose, { Schema, model, models } from "mongoose";

const AppointmentSchema = new Schema(
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
        date: { type: Date, required: true },
        status: {
            type: String,
            enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
            default: "Pending",
        },
    },
    { timestamps: true }
);

const Appointment = models.Appointment || model("Appointment", AppointmentSchema);

export default Appointment;
