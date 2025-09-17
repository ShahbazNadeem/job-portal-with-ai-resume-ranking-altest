import mongoose from "mongoose";

const RankingSchema = new mongoose.Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true, // each application ranked once
      ref: "AppliedJob",
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Job",
    },
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    aiScore: { type: Number, required: true },
    strengths: [String],
    weaknesses: [String],
    verdict: String,
    resume: Object, // storing parsed resume snapshot at ranking time
  },
  { timestamps: true }
);

export default mongoose.models.Ranking ||
  mongoose.model("Ranking", RankingSchema);
