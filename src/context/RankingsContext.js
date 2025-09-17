"use client";

import { createContext, useContext, useState, useEffect } from "react";

const RankingsContext = createContext();

export const RankingsProvider = ({ children }) => {
  const [rankings, setRankings] = useState([]);
  const [filteredRankings, setFilteredRankings] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🟢 Fetch all rankings from API once
  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const res = await fetch("/api/rank");
        const data = await res.json();

        if (data.success) {
          setRankings(data.rankings);
          setFilteredRankings(data.rankings); // show all by default
        }
      } catch (err) {
        console.error("❌ Failed to fetch rankings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  // 🟢 Apply filters (by jobId or score range)
  const filterRankings = ({ jobId, minScore, maxScore }) => {
    let results = [...rankings];

    if (jobId) {
      results = results.filter(r => r.jobId === jobId);
    }

    if (minScore !== undefined) {
      results = results.filter(r => r.aiScore >= minScore);
    }

    if (maxScore !== undefined) {
      results = results.filter(r => r.aiScore <= maxScore);
    }

    setFilteredRankings(results);
  };

  // 🟢 Reset filters
  const resetFilters = () => setFilteredRankings(rankings);

  return (
    <RankingsContext.Provider value={{
      rankings,
      filteredRankings,
      loading,
      filterRankings,
      resetFilters,
    }}>
      {children}
    </RankingsContext.Provider>
  );
};

export const useRankings = () => useContext(RankingsContext);
