import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/UserModel";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
    try {
        await dbConnect();
        const body = await req.json();
        const { name, email, phone, location } = body;

        const user = await UserModel.findById(params.id);
        if (!user) return NextResponse.json({ success: false, message: "User not found" });

        user.name = name;
        user.email = email;
        if (!user.resume) user.resume = {};
        if (!user.resume.personal) user.resume.personal = {};
        user.resume.personal.phone = phone;
        user.resume.personal.location = location;

        await user.save();
        return NextResponse.json({ success: true, user });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, message: "Server error" });
    }
}
