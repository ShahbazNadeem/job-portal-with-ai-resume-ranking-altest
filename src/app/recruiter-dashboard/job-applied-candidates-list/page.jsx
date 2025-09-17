'use client';
import React, { useState } from 'react';
import RecruiterDashboard from '../page';
import { useAppliedJobs } from "@/context/AppliedJobsContext";
import { useRecruiter } from "@/context/RecruiterContext";

const AppliedJobsPage = () => {
  const { appliedJobs, loading, updateJobStatus } = useAppliedJobs();
  const { recruiter } = useRecruiter();

  const [selectedJobId, setSelectedJobId] = useState(null);
  const [rankedCandidates, setRankedCandidates] = useState();
  const [rankingLoading, setRankingLoading] = useState(false);

  if (loading) {
    return (
      <RecruiterDashboard>
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-lg animate-pulse">Loading applied jobs...</p>
        </div>
      </RecruiterDashboard>
    );
  }

  const recruiterJobs = appliedJobs.filter(
    (job) => job.job.postedBy === recruiter?.id
  );

  async function handleRank(application) {
    setSelectedJobId(application.job._id);
    setRankingLoading(true);
    try {
      // single candidate only
      const candidates = [
        {
          id: application.user._id,
          name: application.user.name,
          resume: application.user.resume,
        },
      ];

      // const res = await fetch("/api/rank", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     job: {
      //       title: application.job.title,
      //       description: application.job.description,
      //       requiredSkills: application.job.skills || [],
      //       minExperience: application.job.minExperience || 0,
      //       requiredDegree: application.job.degree || null,
      //     },
      //     candidates,
      //   }),
      // });

     const res = await fetch("/api/rank", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    applicationId: application._id,
    job: {
      _id: application.job._id || application.job.id,   // ✅ fallback
      title: application.job.title,
      description: application.job.description,
      requiredSkills: application.job.skills || [],
      minExperience: application.job.minExperience || 0,
      requiredDegree: application.job.degree || null,
    },
    candidates: [
      {
        id: application.user._id || application.user.id, // ✅ fallback
        name: application.user.name,
        resume: application.user.resume,
      },
    ],
  }),
});


      const data = await res.json();
      if (data.success) {
        setRankedCandidates(data.ranked);
      } else {
        console.error("Ranking error:", data.error);
      }
    } catch (err) {
      console.error(err);
    }
    setRankingLoading(false);
  }

  return (
    <RecruiterDashboard>
      <div className="flex h-[80vh]">
        {/* LEFT SIDE - Applications List */}
        <div className="w-1/3 border-r overflow-y-auto p-4">
          <h2 className="text-xl font-bold mb-4">Applied Candidates</h2>
          {recruiterJobs.length === 0 ? (
            <p className="text-gray-500">No candidates found.</p>
          ) : (
            <ul className="space-y-3">
              {recruiterJobs.map((application) => (
                <li
                  key={application._id}
                  onClick={() => handleRank(application)}
                  className={`p-3 rounded-lg border cursor-pointer ${selectedJobId === application.job._id
                    ? "bg-indigo-100 border-indigo-500"
                    : "bg-white border-gray-200"
                    }`}
                >
                  <h3 className="font-semibold">{application.job.title}</h3>
                  <p className="text-sm text-gray-500">
                    Candidate: {application.user.name}
                  </p>

                  {/* Accept / Decline buttons */}
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateJobStatus(application._id, "accepted");
                      }}
                      className="bg-green-600 text-white py-1 px-3 rounded text-sm"
                    >
                      Accept
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateJobStatus(application._id, "declined");
                      }}
                      className="bg-red-600 text-white py-1 px-3 rounded text-sm"
                    >
                      Decline
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* RIGHT SIDE - Ranked Candidates */}
        <div className="flex-1 p-4 overflow-y-auto">
          {rankingLoading ? (
            <div className="flex justify-center items-center h-full">
              <p className="animate-pulse text-gray-500">Ranking candidates...</p>
            </div>
          ) : (
            <div>
              {/* <span className="text-xl font-bold mb-4 block">Candidate Rank</span> */}
              <div className="space-y-4">
                {rankedCandidates?.map((c, idx) => (
                  <div
                    key={c.id}
                    className="p-4 border rounded-lg shadow-sm bg-white"
                  >
                    <div className="flex justify-between">
                      <h3 className="text-lg font-semibold">{c.name}</h3>
                      <span className="text-sm font-bold text-indigo-600">
                        #{idx + 1} – {c.aiScore}/100
                      </span>
                    </div>

                    {/* Strengths */}
                    {c.strengths?.length > 0 && (
                      <div className="flex flex-col">
                        <span className="font-semibold underline">Strengths:</span>
                        <p className="text-green-700 text-sm">
                          ✅ {c.strengths.join(", ")}
                        </p>
                      </div>
                    )}

                    {/* Weaknesses */}
                    {c.weaknesses?.length > 0 && (
                      <div className="flex flex-col">
                        <span className="font-semibold underline">Weaknesses:</span>
                        <p className="text-gray-500 text-sm">
                          ⚠ {c.weaknesses.join(", ")}
                        </p>
                      </div>
                    )}

                    {/* Verdict */}
                    <p className="italic text-md">
                      AI decision:{" "}
                      <span className="text-sm text-red-400">{c.verdict}</span>
                    </p>

                    {/* Resume */}
                    {c.resume && (
                      <div className="flex flex-col mt-3">
                        <span className="font-semibold border-t text-lg text-center">
                          Resume
                        </span>
                        <span className="font-semibold text-lg underline">
                          Candidate Info
                        </span>

                        {/* Personal Info */}
                        <div className="text-sm flex flex-col">
                          <span className="text-gray-800">
                            Name:{" "}
                            <span className="text-gray-500">
                              {c.resume.personal?.name}
                            </span>
                          </span>
                          <span className="text-gray-800">
                            Email:{" "}
                            <span className="text-gray-500">
                              {c.resume.personal?.email}
                            </span>
                          </span>
                          <span className="text-gray-800">
                            Location:{" "}
                            <span className="text-gray-500">
                              {c.resume.personal?.location || "Not uploaded yet"}
                            </span>
                          </span>
                        </div>

                        {/* Work Experience */}
                        <div className="space-y-2">
                          {c.resume.workExperience && (
                            <span className="font-semibold text-lg underline">
                              Work Experience
                            </span>
                          )}
                          {c.resume.workExperience?.map((exp, idx) => (
                            <div
                              key={idx}
                              className="bg-white p-2 rounded-md shadow-sm"
                            >
                              <p className="font-semibold">
                                {exp.role || ""} {exp.role ? "@" : ""}{" "}
                                {exp.company || exp.line || "-"}
                              </p>
                              {(exp.startDate || exp.endDate) && (
                                <p className="text-sm text-gray-500">
                                  {exp.startDate || "—"} -{" "}
                                  {exp.endDate || "Present"}
                                </p>
                              )}
                              {exp.description && (
                                <p className="text-gray-600">{exp.description}</p>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Education */}
                        <ul className="list-disc ml-6 text-gray-600">
                          {c.resume.education && (
                            <span className="font-semibold text-lg underline">
                              Education
                            </span>
                          )}
                          {c.resume.education?.map((edu, idx) => (
                            <li key={idx}>
                              {edu.line ||
                                [edu.degree, edu.field, edu.school]
                                  .filter(Boolean)
                                  .join(" · ") ||
                                "-"}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </RecruiterDashboard>
  );
};

export default AppliedJobsPage;
