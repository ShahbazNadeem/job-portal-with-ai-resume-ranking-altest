import dbConnect from "@/lib/dbConnect";
import { recruiterSchema } from "@/model/recruiterModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { companyEmail, password } = body;

    if (!companyEmail || !password) {
      return Response.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const recruiter = await recruiterSchema.findOne({ companyEmail });

    if (!recruiter) {
      return Response.json(
        { success: false, message: "Recruiter not found" },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, recruiter.password);

    if (!isMatch) {
      return Response.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: recruiter._id, companyEmail: recruiter.companyEmail },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return Response.json(
      {
        success: true,
        message: "Login successful",
        recruiter: {
          id: recruiter._id,
          companyName: recruiter.companyName,
          companyEmail: recruiter.companyEmail,
          contactNumber: recruiter.contactNumber,
        },
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login API error:", error);
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
