import mongoose from "mongoose";

const AppliedJobModel = new mongoose.Schema(
    {
        user: {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
            name: String,
            email: String,
            resume: { type: Object, required: true },
        },
        job: {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
            title: String,
            description: String,
            location: String,
            salaryRange: String,
            jobType: String,
            experienceRequired: String,
            postedBy: String,
        },
        appliedAt: { type: Date, default: Date.now },
        status: {
            type: String,
            enum: ["pending", "accepted", "declined"],
            default: "pending",
        },
    },
    { timestamps: true }
);
// delete mongoose.models.AppliedJob;
export const AppliedJobSchema = mongoose.models?.appliedJobs || mongoose.model("appliedJobs", AppliedJobModel);
