'use client';
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ManageRecruiterContext = createContext();

export const ManageRecruiterProvider = ({ children }) => {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const res = await axios.get("/api/admin/managerecruiters");
        setRecruiters(res.data.recruiters || []); 
      } catch (error) {
        console.error("Error fetching recruiters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecruiters();
  }, []);

  return (
    <ManageRecruiterContext.Provider value={{ recruiters, setRecruiters, loading }}>
      {children}
    </ManageRecruiterContext.Provider>
  );
};

export const useManageRecruiters = () => useContext(ManageRecruiterContext);
