import mongoose from "mongoose";

const jobModel = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        location: { type: String, required: true },
        salaryRange: { type: String, required: true },
        jobType: { type: String, enum: ["Full-Time", "Part-Time", "Internship", "Contract"], required: true },
        requiredSkills: { type: [String], required: true },
        experienceRequired: { type: String, required: true },
        postedBy: {
            id: { type: String, required: true },
            companyName: { type: String, required: true },
            companyEmail: { type: String, required: true },
            contactNumber: { type: String, required: true },
        },
        closeJob: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const jobSchema = mongoose.models?.jobs || mongoose.model("jobs", jobModel);
