import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { jobSchema } from "@/model/jobModel";

// DELETE /api/recruiter/jobPost/:id
export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;
    if (!id) {
      return NextResponse.json({ success: false, error: "Job ID is required" }, { status: 400 });
    }

    const deletedJob = await jobSchema.findByIdAndDelete(id);

    if (!deletedJob) {
      return NextResponse.json({ success: false, error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    console.error("❌ Job delete error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
 
// job post update api
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const body = await req.json();

    const updatedJob = await jobSchema.findByIdAndUpdate(id, body, { new: true });

    if (!updatedJob) {
      return NextResponse.json({ success: false, error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, job: updatedJob });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
