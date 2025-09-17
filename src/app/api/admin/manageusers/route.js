import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/UserModel";
import { NextResponse } from "next/server";

// GET = fetch all users
export async function GET() {
  try {
    await dbConnect();
    const users = await UserModel.find();

    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
