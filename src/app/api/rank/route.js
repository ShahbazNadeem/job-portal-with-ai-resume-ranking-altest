// import { NextResponse } from "next/server";
// import OpenAI from "openai";
// import dbConnect from "@/lib/dbConnect";
// import rankingModel from "@/model/rankingModel";


// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// async function rankWithOpenAI(job, candidate) {
//   const prompt = `
//   You are an AI recruiter.
//   Compare the job and the candidate resume.

//   Job: ${JSON.stringify(job, null, 2)}
//   Candidate: ${JSON.stringify(candidate.resume, null, 2)}

//   Respond with JSON:
//   {
//     "score": number (0-10),
//     "strengths": [string],
//     "weaknesses": [string],
//     "verdict": string
//   }
//   `;

//   const response = await client.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [{ role: "user", content: prompt }],
//     response_format: { type: "json_object" },
//   });

//   return JSON.parse(response.choices[0].message.content);
// }

// export async function POST(req) {
//   await dbConnect();

//   try {
//     const { job, candidates, applicationId } = await req.json();


//     if (!job || !candidates || !applicationId) {
//       return NextResponse.json(
//         { success: false, error: "Missing input" },
//         { status: 400 }
//       );
//     }

//     // 1️⃣ Check if ranking already exists
//     const existingRanking = await rankingModel.findOne({ applicationId });
//     if (existingRanking) {
//       return NextResponse.json({
//         success: true,
//         ranked: [existingRanking],
//         fromCache: true,
//       });
//     }

//     // 2️⃣ If not found, rank with AI
//     const candidate = candidates[0]; // single candidate case
//     let result;
//     try {
//       result = await rankWithOpenAI(job, candidate);
//     } catch (err) {
//       console.log("AI failed:", err.message);
//       return NextResponse.json(
//         { success: false, error: "AI ranking failed" },
//         { status: 500 }
//       );
//     }

//     // 3️⃣ Save result in DB
//     const newRanking = await rankingModel.create({
//       applicationId,
//       jobId: job._id,
//       candidateId: candidate.id,
//       aiScore: result.score,
//       strengths: result.strengths,
//       weaknesses: result.weaknesses,
//       verdict: result.verdict,
//       resume: candidate.resume,
//     });

//     return NextResponse.json({ success: true, ranked: [newRanking], fromCache: false });
//   } catch (err) {
//     console.log("Ranking error:", err);
//     return NextResponse.json(
//       { success: false, error: "Ranking failed" },
//       { status: 500 }
//     );
//   }
// }

// // ✅ GET all rankings
// export async function GET() {
//   try {
//     await dbConnect();

//     const rankings = await rankingModel.find().sort({ createdAt: -1 }); //sort({ createdAt: -1 }) means newest resume display first

//     return NextResponse.json({
//       success: true,
//       count: rankings.length,
//       rankings,
//     });
//   } catch (err) {
//     console.log("🔥 Error fetching rankings:", err.message);
//     return NextResponse.json(
//       { success: false, error: "Failed to fetch rankings" },
//       { status: 500 }
//     );
//   }
// }
