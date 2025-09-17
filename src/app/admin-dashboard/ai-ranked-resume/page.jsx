"use client";
import React, { useState } from "react";
import { useRankings } from "@/context/RankingsContext";
import AdminDashboard from "../page";
import { motion, AnimatePresence } from "framer-motion";

const RankingsPage = () => {
  const { rankings, loading } = useRankings();

  const [jobIdFilter, setJobIdFilter] = useState("");
  const [minScore, setMinScore] = useState(0);
  const [maxScore, setMaxScore] = useState(Infinity);
  const [selectedResume, setSelectedResume] = useState(null);

  if (loading) return <AdminDashboard>Loading rankings...</AdminDashboard>;

  // Filtering logic
  const filtered = rankings.filter((r) => {
    const byJobId = jobIdFilter ? r.jobId === jobIdFilter : true;
    const byScore = r.aiScore >= minScore && r.aiScore <= maxScore;
    return byJobId && byScore;
  });

  return (
    <AdminDashboard>
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-gray-800">📊 AI Resume Rankings</span>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-8 bg-white shadow-sm rounded-xl p-4 border border-gray-400">
          <input
            type="text"
            placeholder="Filter by Job ID"
            value={jobIdFilter}
            onChange={(e) => setJobIdFilter(e.target.value)}
            className="border px-3 py-2 rounded-lg w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Min Score"
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
            className="border px-3 py-2 rounded-lg w-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Max Score"
            value={maxScore}
            onChange={(e) => setMaxScore(Number(e.target.value))}
            className="border px-3 py-2 rounded-lg w-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Card List instead of boring table */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((r) => (
            <motion.div
              key={r._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white shadow-lg rounded-xl border border-gray-400 p-5 hover:shadow-xl transition"
            >
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-700">
                  Job ID: <span className="text-blue-600">{r.jobId}</span>
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${r.aiScore >= 70
                      ? "bg-green-100 text-green-700"
                      : r.aiScore >= 40
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                  Score: {r.aiScore}
                </span>
              </div>

              <p className="mt-2 text-gray-500 text-sm">
                Candidate: <span className="font-medium">{r.candidateId}</span>
              </p>
              <p className="mt-1 text-gray-600 italic">“{r.verdict}”</p>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setSelectedResume(r.resume)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                >
                  View Resume
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Resume Modal */}
        <AnimatePresence>
          {selectedResume && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="bg-white rounded-xl p-8 w-11/12 max-w-3xl max-h-[80vh] overflow-y-auto shadow-lg"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-4">Resume</h2>
                <pre className="whitespace-pre-wrap text-sm bg-gray-100 p-4 rounded-lg border">
                  {JSON.stringify(selectedResume, null, 2)}
                </pre>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setSelectedResume(null)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminDashboard>
  );
};

export default RankingsPage;
