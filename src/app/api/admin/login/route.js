import dbConnect from "@/lib/dbConnect";
import adminModel from "@/model/adminModel";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return Response.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const admins = await adminModel.findOne({ email });

    if (!admins) {
      return Response.json(
        { success: false, message: "Admin not found" },
        { status: 404 }
      );
    }

    // 🔑 Compare directly (plain text)
    if (admins.password !== password) {
      return Response.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (!process.env.JWT_SECRET) {
      console.error("❌ Missing JWT_SECRET in .env.local");
      return Response.json(
        { success: false, message: "Server misconfiguration" },
        { status: 500 }
      );
    }

    const token = jwt.sign(
      { id: admins._id, email: admins.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return Response.json(
      {
        success: true,
        message: "Login successful",
        admin: {
          id: admins._id,
          email:admins.email,
          role: admins.role,
        },
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("🔥 Admin Login API error:", error.message);
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
