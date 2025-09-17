import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { AppliedJobSchema } from "@/model/AppliedJobModel";



export async function POST(req) {
    try {
        await dbConnect();

        const body = await req.json();
        const { user, job, appliedAt, status } = body;

        if (!user?.id || !user?.resume) {
            return NextResponse.json(
                { success: false, message: "User and resume are required." },
                { status: 400 }
            );
        }

        if (!job?.id) {
            return NextResponse.json(
                { success: false, message: "Job information is required." },
                { status: 400 }
            );
        }

        const appliedJob = await AppliedJobSchema.create({
            user,
            job,
            status: status || "pending",
            appliedAt: appliedAt || new Date(),
        });

        return NextResponse.json(
            { success: true, data: appliedJob },
            { status: 201 }
        );
    } catch (error) {
        console.log("❌ Error applying job:", error);
        return NextResponse.json(
            { success: false, message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}

// GET all applied jobs
export async function GET() {
    try {
        await dbConnect();

        const jobs = await AppliedJobSchema.find({});

        return NextResponse.json(
            { success: true, jobs },
            { status: 200 }
        );
    } catch (error) {
        console.error("❌ Failed to fetch applied jobs:", error);
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}