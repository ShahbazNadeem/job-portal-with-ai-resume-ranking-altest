"use client";
import React, { useState } from "react";
import { useJobs } from "@/context/JobsContext";
import { useUser } from "@/context/UserContext";

const JobsforUser = ({ recruuiterId }) => {
  const { jobs, loading } = useJobs();
  const { user } = useUser();

  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  // Filter jobs client-side
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
      job.location.toLowerCase().includes(searchLocation.toLowerCase())
  );

  const JobSkeleton = () => (
    <li className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border border-gray-200 rounded-xl bg-white shadow-sm animate-pulse">
      <div className="flex-1 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="flex flex-wrap gap-3 mt-2">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
      <div className="mt-4 sm:mt-0 flex gap-2">
        <div className="h-8 w-20 bg-gray-200 rounded"></div>
      </div>
    </li>
  );

  const handleApply = async (job) => {
    if (!user?.resume) {
      alert("Error! Please upload your resume before applying.");
      return;
    }

    const application = {
      user: { id: user._id, name: user.name, email: user.email, resume: user.resume },
      job: {
        id: job._id,
        title: job.title,
        description: job.description,
        location: job.location,
        salaryRange: job.salaryRange,
        jobType: job.jobType,
        experienceRequired: job.experienceRequired,
        postedBy: job.postedBy.id,
      },
      status: "pending",
      appliedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/applied-jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(application),
      });
      const data = await res.json();
      alert(data.success ? "✅ Application submitted!" : "❌ " + data.message);
    } catch (error) {
      console.log(error);
      alert("❌ Something went wrong while applying.");
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-6">
        <ul className="space-y-4">
          {[1, 2, 3].map((n) => (
            <JobSkeleton key={n} />
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      {/* Search/Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Job Title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="text"
          placeholder="Search by Location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {filteredJobs.length > 0 ? (
        <ul className="space-y-4">
          {filteredJobs.map((job) => (
            <li
              key={job._id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300"
            >
              {/* Job Info */}
              <div className="flex-1 space-y-1">
                <span className="text-xs text-gray-500">
                  Posted at {new Date(job.appliedAt).toLocaleDateString()}
                </span>
                <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                <p className="text-gray-600 text-sm">{job.description}</p>
                <div className="text-gray-700 text-sm flex flex-wrap items-center gap-3 mt-2 max-w-[600px]">
                  <span>
                    <span className="font-medium">📍 Location:</span> {job.location}
                  </span>
                  <span>
                    <span className="font-medium">💰 Salary:</span> {job.salaryRange}
                  </span>
                  <span>
                    <span className="font-medium">🕒 Type:</span> {job.jobType}
                  </span>
                  <span>
                    <span className="font-medium">⚡ Exp:</span> {job.experienceRequired}
                  </span>
                  <span className="text-xs text-gray-500">
                    🏢 posted by {job.postedBy.companyName}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-lg ${
                      job.closeJob ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                    }`}
                  >
                    {job.closeJob ? "Closed" : "Open"}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-4 sm:mt-0 flex gap-2">
                <button
                  onClick={() => handleApply(job)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Easy Apply
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No jobs match your search.</p>
      )}
    </div>
  );
};

export default JobsforUser;
