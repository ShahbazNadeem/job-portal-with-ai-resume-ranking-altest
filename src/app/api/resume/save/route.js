import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/UserModel";
import { parseResumeText } from "@/lib/parseResume";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("resume");
    const email = formData.get("email");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    if (!email) {
      return NextResponse.json({ error: "Email not provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let text = "";

    const name = (file.name || "").toLowerCase();
    if (name.endsWith(".pdf")) {
      const pdfParse = (await import("pdf-parse/lib/pdf-parse.js")).default;
      const data = await pdfParse(buffer);
      text = data.text || "";
    } else if (name.endsWith(".docx")) {
      const mammoth = await import("mammoth");
      const { value } = await mammoth.extractRawText({ buffer });
      text = value || "";
    } else {
      return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
    }

    const parsedResume = await parseResumeText(text);

    await dbConnect();

    const updatedUser = await UserModel.findOneAndUpdate(
      { email },
      { $set: { resume: parsedResume } },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error("Upload resume error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
