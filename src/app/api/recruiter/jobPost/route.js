import { NextResponse } from "next/server";
// import Job from "@/models/Job";
import dbConnect from "@/lib/dbConnect";
import { jobSchema } from "@/model/jobModel";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    // Convert requiredSkills (comma separated) into array
    if (typeof body.requiredSkills === "string") {
      body.requiredSkills = body.requiredSkills.split(",").map(skill => skill.trim());
    }

    const newJob = await jobSchema.create(body);

    return NextResponse.json({ success: true, job: newJob }, { status: 201 });
  } catch (error) {
    console.error("❌ Job creation error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

// GET = fetch all jobs
export async function GET() {
  try {
    await dbConnect();
    const jobs = await jobSchema.find();

    return NextResponse.json({ success: true, jobs });
  } catch (error) {
    console.error("❌ Error fetching jobs:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}