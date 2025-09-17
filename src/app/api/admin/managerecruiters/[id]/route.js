import dbConnect from "@/lib/dbConnect";
import { recruiterSchema } from "@/models/recruiterModel";
import { NextResponse } from "next/server";

// DELETE = delete recruiter by ID
export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    const deletedRecruiter = await recruiterSchema.findByIdAndDelete(id);

    if (!deletedRecruiter) {
      return NextResponse.json(
        { success: false, message: "Recruiter not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Recruiter deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error deleting recruiter:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete recruiter" },
      { status: 500 }
    );
  }
}
