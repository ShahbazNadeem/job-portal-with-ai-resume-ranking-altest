"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const JobsContext = createContext();

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`/api/recruiter/jobPost`);

      if (data.success) {
        setJobs(data.jobs);
      }
    } catch (error) {
      console.error("❌ Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  }, []);


  // Load jobs ONCE when app starts
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Refresh jobs when update/delete happens
  const refreshJobs = () => fetchJobs();

  return (
    <JobsContext.Provider value={{ jobs, loading, refreshJobs }}>
      {children}
    </JobsContext.Provider>
  );
};

// Custom hook for easy usage
export const useJobs = () => useContext(JobsContext);
