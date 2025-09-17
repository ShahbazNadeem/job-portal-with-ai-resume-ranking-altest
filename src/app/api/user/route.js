import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/UserModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();

        const { name, email, image } = body;

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // Check if user exists
        let user = await UserModel.findOne({ email });

        if (!user) {
            // Create new user
            user = await UserModel.create({
                name,
                email,
                image,
            });
        }

        return NextResponse.json({ success: true, user }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
