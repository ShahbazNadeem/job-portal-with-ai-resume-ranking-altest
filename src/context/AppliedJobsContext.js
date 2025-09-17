"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const AppliedJobsContext = createContext();

export const AppliedJobsProvider = ({ children }) => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppliedJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/applied-jobs");
      const data = await res.json();

      if (data.success) {
        setAppliedJobs(data.jobs);
      }
    } catch (error) {
      console.error("❌ Error fetching applied jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update job status function
  const updateJobStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/applied-jobs/update-jobstatus/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();
      if (data.success) {
        setAppliedJobs((prev) =>
          prev.map((job) => (job._id === id ? data.job : job))
        );
      }
    } catch (error) {
      console.error("❌ Error updating job status:", error);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  return (
    <AppliedJobsContext.Provider
      value={{ appliedJobs, loading, fetchAppliedJobs, updateJobStatus }}
    >
      {children}
    </AppliedJobsContext.Provider>
  );
};

// custom hook
export const useAppliedJobs = () => useContext(AppliedJobsContext);
