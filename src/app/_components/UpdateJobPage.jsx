'use client';
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useJobs } from "@/context/JobsContext";
import axios from "axios";

export default function UpdateJobPage({ jobId }) {
  const router = useRouter();
  const pathname = usePathname();
  const { jobs, refreshJobs } = useJobs();

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "Full-Time",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (jobs.length > 0) {
      const foundJob = jobs.find((j) => j._id === jobId);
      if (foundJob) setJob(foundJob);
    }
  }, [jobs, jobId]);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };



  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.put(`/api/recruiter/jobPost/${jobId}`, job);

      if (data.success) {
        alert("✅ Job updated successfully!");
        refreshJobs();
        // router.push("/recruiter-dashboard/home"); 
        if (pathname.includes("admin-dashboard")) {
          router.push(`/admin-dashboard/home`);
        } else {
          router.push(`/recruiter-dashboard/home`);
        }
      } else {
        alert("❌ " + (data.error || "Update failed"));
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-center">
          <span className="text-3xl sm:text-4xl font-extrabold text-white flex items-center justify-center gap-2">
            ✏️ Update Job Post
          </span>
          <p className="text-purple-200 mt-2 text-sm">Modify job details and save changes</p>
        </div>

        {/* Form */}
        <form onSubmit={handleUpdate} className="p-6 sm:p-10 space-y-6">
          {/* Job Title */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Job Title</label>
            <input
              type="text"
              name="title"
              value={job.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Job Description</label>
            <textarea
              name="description"
              value={job.description}
              onChange={handleChange}
              rows="5"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none transition resize-none"
            />
          </div>

          {/* Location + Salary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={job.location}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Salary</label>
              <input
                type="text"
                name="salary"
                value={job.salaryRange}
                onChange={handleChange}
                placeholder="$50k - $80k"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
              />
            </div>
          </div>

          {/* Job Type + Experience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Job Type</label>
              <select
                name="type"
                value={job.type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-800 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
              >
                <option>Full-Time</option>
                <option>Part-Time</option>
                <option>Internship</option>
                <option>Contract</option>
                <option>Remote</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Experience Required</label>
              <input
                type="text"
                name="company"
                value={job.experienceRequired}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
              />
            </div>
          </div>



          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="w-full sm:w-1/2 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`w-full sm:w-1/2 py-3 rounded-lg font-semibold text-white shadow-md transform transition ${loading
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 hover:scale-[1.02]"
                }`}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
