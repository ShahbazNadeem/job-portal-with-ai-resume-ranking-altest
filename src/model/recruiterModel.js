import mongoose from "mongoose";

const recruiterModel = new mongoose.Schema({
    companyName: { type: String, required: true },
    companyEmail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contactNumber: { type: String, required: true },
});

export const recruiterSchema = mongoose.models?.recruiters || mongoose.model("recruiters", recruiterModel);
