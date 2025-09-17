import dbConnect from "@/lib/dbConnect";
import { recruiterSchema } from "@/model/recruiterModel";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { name, email, contact, password } = body;

    if (!name || !email || !contact || !password) {
      return Response.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingRecruiter = await recruiterSchema.findOne({ companyEmail: email });
    if (existingRecruiter) {
      return Response.json(
        { success: false, message: "Recruiter already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newRecruiter = await recruiterSchema.create({
      companyName: name,
      companyEmail: email,
      contactNumber: contact,
      password: hashedPassword,
    });

    return Response.json(
      {
        success: true,
        message: "Recruiter registered successfully",
        recruiter: {
          id: newRecruiter._id,
          companyName: newRecruiter.companyName,
          companyEmail: newRecruiter.companyEmail,
          contactNumber: newRecruiter.contactNumber,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup API error:", error);
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
