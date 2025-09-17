import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/UserModel";
import { NextResponse } from "next/server";

// DELETE = remove user by id
export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error deleting user:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete user" },
      { status: 500 }
    );
  }
}
