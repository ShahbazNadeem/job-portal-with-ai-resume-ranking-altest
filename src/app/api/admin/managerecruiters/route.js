import dbConnect from "@/lib/dbConnect";
import { recruiterSchema } from "@/models/recruiterModel";
import { NextResponse } from "next/server";

// GET = fetch all recruiters
export async function GET() {
  try {
    await dbConnect();
    const recruiters = await recruiterSchema.find();

    return NextResponse.json({ success: true, recruiters }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching recruiters:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch recruiters" },
      { status: 500 }
    );
  }
}
