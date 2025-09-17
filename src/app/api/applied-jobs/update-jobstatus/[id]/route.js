import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { AppliedJobSchema } from "@/model/AppliedJobModel";

// PATCH /api/applied-jobs/:id
export async function PATCH(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;
    const { status } = await req.json();

    if (!status) {
      return NextResponse.json(
        { success: false, message: "Status is required" },
        { status: 400 }
      );
    }

    const updatedJob = await AppliedJobSchema.findByIdAndUpdate(
      id,
      { status },
      { new: true } // return updated doc
    );

    if (!updatedJob) {
      return NextResponse.json(
        { success: false, message: "Applied job not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, job: updatedJob },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error updating applied job:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
